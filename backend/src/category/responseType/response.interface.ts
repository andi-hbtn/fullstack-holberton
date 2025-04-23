import { CategoryEntity } from "../entity/category.entity";

export interface CreateCategoryResponse {
  statusCode: number;
  message: string;
  data: CategoryEntity;
}

export interface updateCategoryResponse{
  statusCode: number;
  message: string;
  data: CategoryEntity;
}