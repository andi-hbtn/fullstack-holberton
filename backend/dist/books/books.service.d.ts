import { BookEntity } from './entity/books.enity';
import { Repository } from 'typeorm';
import { BookDto } from "./dto/book.dto";
export declare class BookService {
    private readonly bookEntity;
    constructor(bookEntity: Repository<BookEntity>);
    getAllBooks(): Promise<BookEntity[]>;
    createBooks(data: BookDto, file: string): Promise<any>;
    updateBooks(data: BookDto, id: number, file?: string): Promise<BookEntity>;
    getBookById(id: number): Promise<BookEntity>;
    deleteBook(id: number): Promise<any>;
}
