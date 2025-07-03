// src/product/dto/create-product.dto.ts
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateProductVariantDto } from './updateProductVariant.dto';

export class ProductVariantArrayDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateProductVariantDto)
    productVariants: UpdateProductVariantDto[];
}