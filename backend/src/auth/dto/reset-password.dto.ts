import { IsEmail, IsString, MinLength } from 'class-validator';
export class ForgotPasswordDto {
    @IsEmail()
    email: string;
}

export class ResetPasswordDto {
    @IsString()
    @MinLength(8)
    newPassword: string;
}