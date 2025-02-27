import { IsString, IsNotEmpty, IsNumber, IsBoolean } from "class-validator";
import { Transform } from 'class-transformer';

export class ProductDto {

	@IsNotEmpty()
	@IsString()
	title: string;

	@IsNotEmpty()
	@IsString()
	description: string;

	@IsNotEmpty()
	@IsNumber()
	@Transform(({ value }) => parseFloat(value))
	price: number;

	@IsNotEmpty()
	@IsBoolean()
	@Transform(({ value }) => value === 'true')
	is_active: boolean;

	@IsNotEmpty()
	@IsNumber()
	@Transform(({ value }) => parseInt(value))
	category_id: number;

	image:string
}