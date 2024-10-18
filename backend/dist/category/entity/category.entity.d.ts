import { BookEntity } from "src/books/entity/books.enity";
export declare class CategoryEntity {
    id: number;
    name: string;
    description: string;
    created: Date;
    books: BookEntity[];
}
