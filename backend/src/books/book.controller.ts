import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe,UseGuards, UseInterceptors, Res, UploadedFile } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { BookService } from './books.service';
import { BookEntity } from './entity/books.enity';
import { BookDto } from './dto/book.dto';
import { diskStorage } from 'multer';
import { ImageNameHelper } from '../helpers/imageName.helper';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from "fs";


@UseGuards(AuthGuard)
@Controller('book')
export class BookController {
	constructor(private readonly bookService: BookService) { }

	@Get('all')
	public async getAll() {
		return await this.bookService.getAllBooks()
	}

	@Post('create')
	@UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, image, cb) => {
                const imageName = new ImageNameHelper(image.originalname).getImageName();
                cb(null, imageName);
            }
        }),
    }))
	public async cretePost(@Body() bodyParam: BookDto, @UploadedFile() file: Express.Multer.File) {
		return await this.bookService.createBooks(bodyParam,file.filename);
	}

	@Put('update/:id')
	@UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, image, cb) => {
                const imageName = new ImageNameHelper(image.originalname).getImageName();
                cb(null, imageName);
            }
        }),
    }))
	public async update(@Body() bodyParam: BookDto, @Param('id', ParseIntPipe) id: number,@UploadedFile() file: Express.Multer.File): Promise<any> {
		const book = await this.bookService.getBookById(id);
		if(book){
			if(file) {
                //const files = await fs.promises.readdir('uploads');
                fs.unlinkSync('uploads/' + book.image);
                return await this.bookService.updateBooks(bodyParam, id, file.filename);
			}
			return await this.bookService.updateBooks(bodyParam, id, book?.image);
		}
	}

	@Get('get/:id')
	public async getById(@Param('id', ParseIntPipe) id: number): Promise<BookEntity> {
		return await this.bookService.getBookById(id);
	}

	@Delete('delete/:id')
	public async deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<any> {
		const book = await this.bookService.getBookById(id);
        if (book) {
            const files = await fs.promises.readdir('uploads');
            fs.unlinkSync('uploads/' + book.image);
            await this.bookService.deleteBook(id)
        }
	}

	@UseGuards(AuthGuard)
    @Get('uploads/:path')
    public getImage(@Param() path, @Res() res: Response) {
        res.sendFile(path.path, { root: 'uploads' });
    }
}