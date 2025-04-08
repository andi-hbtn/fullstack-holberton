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
	price: number;

	@IsNotEmpty()
	@IsNumber()
	stock:number;

	@IsNotEmpty()
	@IsBoolean()
	@Transform(({ value }) => value === 'true')
	is_active: boolean;

	@IsNotEmpty()
	@IsNumber()
	category_id: number;

	image:string
}