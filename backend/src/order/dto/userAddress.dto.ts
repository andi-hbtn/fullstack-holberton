import { IsString, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, Length } from 'class-validator';

export class UserAddressDto {
    @IsNotEmpty()
    @IsString()
    firstname: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;

    @IsNotEmpty()
    @IsString()
    country: string;

    @IsNotEmpty()
    @IsString()
    town: string;

    @IsNotEmpty()
    @IsString()
    zipCode: string;

    @IsNotEmpty()
    @IsString()
    street_address: string;

    @IsOptional()
    @IsString()
    appartment?: string;

    @IsOptional()
    @IsString()
    message?: string;
}
