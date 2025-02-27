import { IsNumber, IsNotEmpty, IsArray, IsEnum,IsDateString} from "class-validator";

export class OrderDto {
	@IsNumber()
	@IsNotEmpty()
	user_id: number;

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
	createdAt:Date

}