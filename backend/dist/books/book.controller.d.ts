import { BookService } from './books.service';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
    getAll(): Promise<import("./entity/books.enity").BookEntity[]>;
    cretePost(param: any): Promise<any>;
}
