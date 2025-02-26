import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class OrderDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsOptional()
	createdAt?: Date;

}