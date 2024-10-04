import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './entity/books.enity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
	constructor(@InjectRepository(BookEntity) private readonly bookEntity: Repository<BookEntity>) { }

	public async getAllBooks() {
		return await this.bookEntity.find();
	}

	public async createBook(data: any) {
		return await this.bookEntity.save(data);
	}
}
