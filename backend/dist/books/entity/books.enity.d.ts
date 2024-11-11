import { CategoryEntity } from "src/category/entity/category.entity";
import { AuthorEntity } from "src/author/entity/author.entity";
export declare class BookEntity {
    id: number;
    title: string;
    description: string;
    price: number;
    is_active: boolean;
    category: CategoryEntity;
    author: AuthorEntity;
    author_id: number;
    category_id: number;
    image: string;
}
