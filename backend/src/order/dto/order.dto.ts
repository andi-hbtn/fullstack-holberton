import { IsNumber, IsNotEmpty, IsArray, IsEnum, IsDateString, IsOptional, IsString, IsEmail } from "class-validator";

export class OrderDto {
	@IsOptional()
	@IsNumber()
	user_id?: number;

	@IsArray()
	@IsNotEmpty()
	items: {
		product_id: number;
		quantity: number;
		variantId: number
		color: string
		color_image: string
		main_image: string
		price: number
	}[];

	@IsNumber()
	@IsNotEmpty()
	total_price: number;

	@IsEnum(['pending', 'shipped', 'delivered', 'cancelled'])
	status: string;

	@IsDateString()
	created_at: Date;

	@IsOptional()
	@IsString()
	firstname?: string;

	@IsOptional()
	@IsString()
	lastname?: string;

	@IsEmail()
	email: string;

	@IsString()
	password: string;

	@IsOptional()
	@IsString()
	phone?: string;

	@IsOptional()
	@IsString()
	country?: string;

	@IsOptional()
	@IsString()
	town?: string;

	@IsOptional()
	@IsString()
	zipCode?: string;

	@IsOptional()
	@IsString()
	street_address?: string;

	@IsOptional()
	@IsString()
	appartment?: string;

	@IsOptional()
	@IsString()
	message?: string;

}