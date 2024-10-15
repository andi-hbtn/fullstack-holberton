import { IsString, IsNotEmpty } from "class-validator";

export class AuthorDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	lastname: string;
}