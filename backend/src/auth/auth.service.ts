import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from "./dto/login.dto";
import { ServiceHandler } from "../errorHandler/service.error";
import { UserEntity } from 'src/user/entity/user.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';


@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private readonly userService: UserService,
    ) { }

    public async registerUser(bodyParam: RegisterDto): Promise<{ user: UserEntity, token: string }> {
        try {
            const checkUser = await this.userService.findByEmail(bodyParam.email);
            if (checkUser) {
                throw new ServiceHandler("You are already registered", HttpStatus.FOUND);
            }

            const hashedPassword = await bcrypt.hash(bodyParam.password, 10);
            const user = await this.userService.registerUser({
                ...bodyParam,
                password: hashedPassword,
                roles: 'user',
                createdAt: new Date()
            });

            const token = await this.jwtService.signAsync({ id: user.id });
            return { user, token };
        } catch (error) {
            throw new ServiceHandler(error.response, error.status);
        }
    }

    public async loginUser(bodyParam: LoginDto): Promise<{ user: UserEntity, token: string }> {
        try {
            const user = await this.userService.findByEmail(bodyParam.email);
            if (!user) {
                throw new ServiceHandler("user with this email was not found", HttpStatus.NOT_FOUND)
            }
            const password = await bcrypt.compare(bodyParam.password, user?.password)
            if (!password) {
                throw new ServiceHandler("your password is incorrect", HttpStatus.NOT_FOUND)
            }
            const token = await this.jwtService.signAsync({ id: user.id });
            return { user, token };
        } catch (error) {
            throw new ServiceHandler(error.response, error.status);
        }

    }

    public async authUserId(request: Request): Promise<number> {
        try {
            const jwt = request.cookies?.jwt;
            if (!jwt) {
                throw new ServiceHandler("You are anauthorized", HttpStatus.UNAUTHORIZED);
            }

            const decodedToken: any = this.jwtService.decode(jwt);
            const currentTime = Math.floor(Date.now() / 1000);

            if (decodedToken.exp < currentTime) {
                throw new HttpException("Token expired", HttpStatus.UNAUTHORIZED);
            }
            const { id } = await this.jwtService.verifyAsync(jwt);
            return id;
        } catch (error) {
            throw new ServiceHandler(error.response, error.status);
        }
    }

    public async getUserById(id: number): Promise<UserEntity[]> {
        try {
            const result = await this.userService.findById(id);
            if (!result) {
                throw new ServiceHandler("User with this id was not found", HttpStatus.NOT_FOUND);
            }
            return result;
        } catch (error) {
            throw new ServiceHandler(error.response, error.status);
        }
    }

    public async getUserByEmail(email: string): Promise<UserEntity> {
        try {
            const result = await this.userService.findByEmail(email);
            if (!result) {
                throw new ServiceHandler("User with this id was not found", HttpStatus.NOT_FOUND);
            }
            return result;
        } catch (error) {
            throw new ServiceHandler(error.response, error.status);
        }
    }

    public async createPasswordResetToken(user: UserEntity): Promise<string> {
        try {
            const resetToken = crypto.randomBytes(32).toString('hex');
            const hashedToken = crypto
                .createHash('sha256')
                .update(resetToken)
                .digest('hex');

            await this.userService.setPasswordResetToken(
                user.id,
                hashedToken,
                new Date(Date.now() + 10 * 60 * 1000) // 10 minutes expiration
            );

            return resetToken;
        } catch (error) {
            throw new ServiceHandler(error.response, error.status);
        }
    }

    public async validateResetToken(token: string): Promise<UserEntity> {
        try {
            const hashedToken = crypto
                .createHash('sha256')
                .update(token)
                .digest('hex');

            const user = await this.userService.findByResetToken(hashedToken);
            if (!user || user.passwordResetExpires < new Date()) {
                throw new ServiceHandler('Invalid or expired token', HttpStatus.BAD_REQUEST);
            }
            return user;
        } catch (error) {
            {
                // Log the error details for debugging
                console.error('Token validation failed:', error);
                // Throw generic error for unexpected issues
                throw new ServiceHandler(error.response, error.status);
            }
        }
    }

    public async sendPasswordResetEmail(email: string, token: string): Promise<void> {
        try {
            //node-mailer
            //oxpp ggch itwc jpnz
            //https://support.google.com/accounts/answer/185833?visit_id=638825869642420653-2156485490&p=InvalidSecondFactor&rd=1

            const transporter = nodemailer.createTransport({
                service: 'Gmail', // or your SMTP provider
                host: "smtp.gmail.com",
                port: 587,
                auth: {
                    user: 'andi.bevapi@gmail.com',
                    pass: 'oxpp ggch itwc jpnz',
                },
            });

            const resetUrl = `http://localhost:3001/reset-password/${token}`;

            await transporter.sendMail({
                from: 'andi.bevapi@gmail.com',
                to: email,
                subject: 'Password Reset Request',
                html: `Click <a href="${resetUrl}">here</a> to reset your password.`,
            });
        } catch (error) {
            console.error(`Failed to send password reset email: ${error.message}`);
            throw new ServiceHandler(
                'Failed to send password reset email',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    public async handlePasswordReset(
        token: string,
        newPassword: string
    ): Promise<{ message: string, status: number }> {
        try {
            // Validate token
            const user = await this.validateResetToken(token);

            // Hash new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Update password and clear token
            await this.userService.updateUserPassword(user.id, hashedPassword);
            await this.userService.clearResetToken(user.id);

            return {
                message: 'Password updated successfully',
                status: HttpStatus.OK
            };
        } catch (error) {
            // Handle known error types
            if (error instanceof ServiceHandler) {
                throw error; // Preserve existing error handling
            }

            // Log unexpected errors
            console.error(`Password reset failed: ${error.message}`);

            throw new ServiceHandler(
                'Password reset failed. Please try again later.',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}