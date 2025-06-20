import { ProductEntity } from "../entity/products.entity";
import { ProductColorImageEntity } from "../entity/productColors.entity";

export interface ProductResponse {
  statusCode: number;
  message: string;
  data: ProductEntity;
}

export interface ProductColorResponse {
  statusCode: number;
  message: string;
  data: ProductColorImageEntity
}

export interface DeleteProductResponse {
  statusCode: number,
  message: string,
}