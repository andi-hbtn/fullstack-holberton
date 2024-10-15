import { IsString, IsNotEmpty, IsNumber, IsBoolean } from "class-validator";

export class BookDto {

	@IsNotEmpty()
	@IsString()
	title: string;

	@IsNotEmpty()
	@IsString()
	description: string;

	@IsNotEmpty()
	@IsNumber()
	price: number;

	@IsNotEmpty()
	@IsBoolean()
	is_active: boolean;

	@IsNotEmpty()
	@IsNumber()
	category_id: number;

	@IsNotEmpty()
	@IsNumber()
	author_id: number;

}