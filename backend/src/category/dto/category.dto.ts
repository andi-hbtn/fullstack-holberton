import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CategoryDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsOptional()
	createdAt?: Date;
}