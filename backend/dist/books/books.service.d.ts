import { BookEntity } from './entity/books.enity';
import { Repository } from 'typeorm';
export declare class BookService {
    private readonly bookEntity;
    constructor(bookEntity: Repository<BookEntity>);
    getAllBooks(): Promise<BookEntity[]>;
    createBook(data: any): Promise<any>;
}
