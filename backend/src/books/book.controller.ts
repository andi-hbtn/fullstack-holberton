import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe,UseGuards, UseInterceptors, Res, UploadedFile } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { BookService } from './books.service';
import { BookEntity } from './entity/books.enity';
import { BookDto } from './dto/book.dto';
import { diskStorage } from 'multer';
import { ImageNameHelper } from '../helpers/imageName.helper';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';


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
	public async cretePost(@Body() bodyParam: any, @UploadedFile() file: Express.Multer.File) {
		console.log("bodyParam----",bodyParam);
		return await this.bookService.createBooks(bodyParam,file.filename);
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

	@UseGuards(AuthGuard)
    @Get('uploads/:path')
    public getImage(@Param() path, @Res() res: Response) {
        res.sendFile(path.path, { root: 'uploads' });
    }
}