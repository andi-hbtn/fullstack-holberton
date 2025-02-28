import { IsNotEmpty, IsString, IsEmail, IsOptional } from "class-validator";

export class UserDto {
	@IsString()
	@IsNotEmpty()
	firstname: string;

	@IsString()
	@IsNotEmpty()
	lastname: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;

	@IsOptional()
	createdAt:Date

}