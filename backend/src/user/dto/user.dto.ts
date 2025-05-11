import { IsNotEmpty, IsString, IsEmail, IsOptional, IsNumber } from "class-validator";

export class UserDto {
	@IsString()
	@IsNotEmpty()
	firstname: string;

	@IsString()
	@IsNotEmpty()
	lastname: string;

	@IsOptional()
	roles: string;

	@IsNumber()
	@IsNotEmpty()
	phone: number;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;

	@IsOptional()
	createdAt: Date

}