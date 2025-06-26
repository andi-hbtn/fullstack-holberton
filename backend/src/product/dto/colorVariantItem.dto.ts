import { IsString, IsNotEmpty, IsNumber, Min } from "class-validator";

export class ColorVariantItemDto {
    @IsNotEmpty()
    @IsString()
    colorName: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    stock: number;
}