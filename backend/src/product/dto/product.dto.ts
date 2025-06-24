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
	@IsBoolean()
	@Transform(({ value }) => {
		if (typeof value === 'string') {
			return value === 'true' || value === '1' || value === 'on';
		}
		return Boolean(value);
	})
	is_active: boolean;

	@IsNotEmpty()
	@IsNumber()
	@Type(() => Number)
	category_id: number;


	image: string
}