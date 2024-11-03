import { IsNotEmpty, IsString, IsEmail, IsBoolean } from "class-validator";

export class UserDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	lastname: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;

}