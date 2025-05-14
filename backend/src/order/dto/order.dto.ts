import { IsNumber, IsNotEmpty, IsArray, IsEnum, IsDateString, IsOptional } from "class-validator";

export class OrderDto {
	@IsOptional()
	@IsNumber()
	user_id?: number;

	@IsArray()
	@IsNotEmpty()
	items: {
		product_id: number;
		quantity: number;
	}[];

	@IsNumber()
	@IsNotEmpty()
	total_price: number;

	@IsEnum(['pending', 'shipped', 'delivered', 'cancelled'])
	status: string;

	@IsDateString()
	created_at: Date
}