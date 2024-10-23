import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { BookService } from './books.service';
import { BookEntity } from './entity/books.enity';
import { BookDto } from './dto/book.dto';

@Controller('book')
export class BookController {
	constructor(private readonly bookService: BookService) { }

	@Get('all')
	public async getAll() {
		return await this.bookService.getAllBooks()
	}

	@Post('create')
	public async cretePost(@Body() param: any) {
		return await this.bookService.createBooks(param);
	}

	@Put('update/:id')
	public async update(@Body() bodyParam: BookDto, @Param('id', ParseIntPipe) id: number): Promise<BookEntity> {
		return await this.bookService.updateBooks(bodyParam, id);
	}

	@Get('get/:id')
	public async getById(@Param('id', ParseIntPipe) id: number): Promise<BookEntity> {
		return await this.bookService.getBookById(id);
	}

	@Delete('book/:id')
	public async deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<any> {
		return await this.bookService.deleteBook(id);
	}
}