import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe,UseGuards, UseInterceptors, Res, UploadedFile } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guards';
import { ProductService } from './products.service';
import { ProductEntity } from './entity/products.enity';
import { ProductDto } from './dto/product.dto';
import { diskStorage } from 'multer';
import { ImageNameHelper } from '../helpers/imageName.helper';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from "fs";


// @UseGuards(AuthGuard)
@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) { }

	@Get('all')
	public async getAll() {
		return await this.productService.getAllProducts()
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
	public async cretePost(@Body() bodyParam: ProductDto, @UploadedFile() file: Express.Multer.File) {
		return await this.productService.createProduct(bodyParam,file.filename);
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
	public async update(@Body() bodyParam: ProductDto, @Param('id', ParseIntPipe) id: number,@UploadedFile() file: Express.Multer.File): Promise<any> {
		const book = await this.productService.getProductById(id);
		if(book){
			if(file) {
                //const files = await fs.promises.readdir('uploads');
                fs.unlinkSync('uploads/' + book.image);
                return await this.productService.updateProduct(bodyParam, id, file.filename);
			}
			return await this.productService.updateProduct(bodyParam, id, book?.image);
		}
	}

	@Get(':id')
	public async getById(@Param('id', ParseIntPipe) id: number): Promise<ProductEntity> {
		return await this.productService.getProductById(id);
	}

	@Delete('delete/:id')
	public async deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<any> {
		const product = await this.productService.getProductById(id);
        if (product) {
            // const files = await fs.promises.readdir('uploads');
            // fs.unlinkSync('uploads/' + product.image);
            await this.productService.deleteProduct(id);
        }
	}

	// @UseGuards(AuthGuard)
    @Get('uploads/:path')
    public getImage(@Param() path:any, @Res() res: Response) {

		console.log("path----",path);
        res.sendFile(path.path, { root: 'uploads' });
    }
}