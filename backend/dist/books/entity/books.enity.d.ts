import { CategoryEntity } from "src/category/entity/category.entity";
export declare class BookEntity {
    id: number;
    title: string;
    description: string;
    price: number;
    is_active: boolean;
    category: CategoryEntity;
}
