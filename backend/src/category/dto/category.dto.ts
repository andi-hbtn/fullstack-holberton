import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CategoryDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsOptional()
	createdAt?: Date;

}