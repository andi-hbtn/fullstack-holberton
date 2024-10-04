import { Controller, Get, Post, Body } from '@nestjs/common';
import { BookService } from './books.service';

@Controller('book')
export class BookController {
	constructor(private readonly bookService: BookService) { }

	@Get('all')
	public async getAll() {
		return await this.bookService.getAllBooks()
	}

	@Post('create')
	public async cretePost(@Body() param: any) {
		return await this.bookService.createBook(param);
	}

}