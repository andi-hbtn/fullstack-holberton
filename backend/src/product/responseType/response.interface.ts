import { ProductEntity } from "../entity/products.entity";
import { ProductColorImageEntity } from "../entity/productColors.entity";

export interface ProductResponse {
  status: number;
  message: string;
  data: ProductEntity;
}

export interface AllProductResponse {
  status: number;
  message: string;
  data: ProductEntity[];
}

export interface ProductColorResponse {
  status: number;
  message: string;
  data: ProductColorImageEntity
}

export interface DeleteProductResponse {
  status: number,
  message: string,
}