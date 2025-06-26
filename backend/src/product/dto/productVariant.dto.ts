import { IsArray, ValidateNested } from "class-validator";
import { ColorVariantItemDto } from "./colorVariantItem.dto";
import { Type } from "class-transformer";
export class ProductVariantDto {

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ColorVariantItemDto)
    productVariants: ColorVariantItemDto[]

}