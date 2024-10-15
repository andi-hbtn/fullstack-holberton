import { BookEntity } from "src/books/entity/books.enity";
export declare class AuthorEntity {
    id: number;
    name: string;
    lastname: string;
    books: BookEntity[];
}
