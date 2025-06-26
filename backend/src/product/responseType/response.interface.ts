import { ProductEntity } from "../entity/products.entity";
import { ProductColorVariant } from "../entity/productColorVariants.entity";

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
  data: ProductColorVariant
}

export interface DeleteProductResponse {
  status: number,
  message: string,
}