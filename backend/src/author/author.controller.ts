import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorEntity } from './entity/author.entity';
import { AuthorDto } from './dto/author.dto';

@Controller('author')
export class AuthorController {
	constructor(private readonly authorService: AuthorService) { }

	@Get('all')
	public async getAll(): Promise<AuthorEntity[]> {
		return await this.authorService.getAllAuthors();
	}

	@Post('create')
	public async create(@Body() bodyParam: AuthorDto): Promise<AuthorEntity> {
		return await this.authorService.createAuthor(bodyParam);
	}

	@Put('update/:id')
	public async update(@Body() bodyParam: AuthorDto, @Param('id', ParseIntPipe) id: number): Promise<AuthorEntity> {
		return await this.authorService.updateAuthor(bodyParam, id);
	}

	@Get('get/:id')
	public async getById(@Param('id', ParseIntPipe) id: number): Promise<AuthorEntity> {
		return await this.authorService.getAuthorById(id);
	}

	@Delete('delete/:id')
	public async deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<any> {
		return await this.authorService.deleteAuthor(id);
	}
}