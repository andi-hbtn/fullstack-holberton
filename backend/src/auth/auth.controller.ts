import { Controller, Post, Body, Res, Get, UseGuards, Req } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/user/entity/user.entity';
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from './dto/register.dto';
import { HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { Response, Request } from 'express';
import { ServiceHandler } from "../errorHandler/service.error";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private authService: AuthService,
        private jwtService: JwtService,
    ) { }

    @Post('register')
    public async register(@Body() bodyParam: RegisterDto, @Res({ passthrough: true }) response: Response): Promise<UserEntity> {
        try {
            const checkUser = await this.userService.findByEmail(bodyParam.email);
            if (checkUser) {
                throw new ServiceHandler("You are already registered ", HttpStatus.FOUND)
            } else {
                const hashedPassword = await bcrypt.hash(bodyParam?.password, 10);
                const user = {
                    firstname: bodyParam.firstname,
                    lastname: bodyParam.lastname,
                    email: bodyParam.email,
                    password: hashedPassword,
                    roles: "admin",
                    createdAt: new Date()
                }
                const result = await this.userService.registerUser(user);
                const jwt = await this.jwtService.signAsync({ id: result.id });
                response.cookie('jwt', jwt, { httpOnly: true });
                return result;
            }
        } catch (error) {
            throw new ServiceHandler(error.response, error.status)
        }
    }

    //httpOnly cohen vetem nga fronti por nuk aksesohen nga fronti per arsye sigurie sepse nese e kan bejne cte duan me TOKEN
    //duhet qe te marrim cookie nga Fronti per ne backend dhe kjo behete me passthrough: true
    @Post('login')
    public async login(@Body() bodyParam: LoginDto, @Res({ passthrough: true }) response: Response) {
        try {
            const user = await this.userService.findByEmail(bodyParam.email);
            if (!user) {
                throw new ServiceHandler("user with this email was not found", HttpStatus.NOT_FOUND)
            }
            const password = await bcrypt.compare(bodyParam.password, user?.password)
            if (!password) {
                throw new ServiceHandler("your password is incorrect", HttpStatus.NOT_FOUND)
            }
            const jwt = await this.jwtService.signAsync({ id: user.id });
            response.cookie('jwt', jwt, { httpOnly: true });
            return user;
        } catch (error) {
            throw new ServiceHandler(error.response, error.status);
        }
    }

    @Post('logout')
    //fshijme cookie sepse fronti nuk ka akses ti fshije
    public logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt');
        return { "message": "success", "status": 201 }
    }

    @Get('checkUser')
    public async checkAuthUser(@Req() request: Request): Promise<UserEntity[]> {
        const id = await this.authService.authUserId(request);
        return await this.userService.findById(id);
    }

}
