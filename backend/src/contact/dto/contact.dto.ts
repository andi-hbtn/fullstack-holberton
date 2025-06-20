import { IsString, IsNotEmpty, IsEmail, Length } from "class-validator";

export class ContactDto {
    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    fullname: string;

    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    subject: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(10, 1000)
    message: string;
}