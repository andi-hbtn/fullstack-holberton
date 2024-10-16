import { IsNotEmpty, IsString, IsEmail, IsBoolean } from "class-validator";

export class UserDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	lastname: string;

	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsBoolean()
	@IsNotEmpty()
	is_admin?: boolean;

	@IsString()
	@IsNotEmpty()
	passsword: string;

}