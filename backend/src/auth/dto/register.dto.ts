import { IsString,IsEmail,IsNotEmpty } from "class-validator";

export class RegisterUserDto{

    @IsNotEmpty()
    @IsString()
    firstname:string;

    @IsNotEmpty()
    @IsString()
    lastname:string;

    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsString()
    password:string;
}