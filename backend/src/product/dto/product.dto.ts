import { IsString, IsNotEmpty, IsNumber, IsBoolean } from "class-validator";
import { Transform, Type } from 'class-transformer';

export class ProductDto {

	@IsNotEmpty()
	@IsString()
	title: string;

	@IsNotEmpty()
	@IsString()
	description: string;

	@IsNotEmpty()
	@IsNumber()
	@Transform(({ value }) => parseInt(value))
	price: number;

	@IsNotEmpty()
	@IsNumber()
	@Transform(({ value }) => parseInt(value))
	stock:number;

	@IsNotEmpty()
	@IsBoolean()
	@Transform(({ value }) => value === 'true')
	is_active: boolean;

	@IsNotEmpty()
	@IsNumber()
	@Type(() => Number)
	category_id: number;

	
	image:string
}