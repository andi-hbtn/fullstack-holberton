import { ProductEntity } from "../entity/products.enity";

export interface ProductResponse {
  statusCode: number;
  message: string;
  data: ProductEntity;
}

export interface DeleteProductResponse {
  statusCode: 200,
  message: string,
}