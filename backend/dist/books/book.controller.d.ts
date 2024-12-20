import { BookService } from './books.service';
import { BookEntity } from './entity/books.enity';
import { BookDto } from './dto/book.dto';
import { Response } from 'express';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
    getAll(): Promise<BookEntity[]>;
    cretePost(bodyParam: BookDto, file: Express.Multer.File): Promise<any>;
    update(bodyParam: BookDto, id: number, file: Express.Multer.File): Promise<any>;
    getById(id: number): Promise<BookEntity>;
    deleteCategory(id: number): Promise<any>;
    getImage(path: any, res: Response): void;
}
