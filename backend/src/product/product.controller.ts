import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, UseGuards, UseInterceptors, Res, UploadedFile } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guards';
import { PermissionGuard } from 'src/guards/permission.guards';
import { IsPublic } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { ProductService } from './products.service';
import { ProductEntity } from './entity/products.enity';
import { ProductDto } from './dto/product.dto';
import { diskStorage } from 'multer';
import { ImageNameHelper } from '../helpers/imageName.helper';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from "fs";


@UseGuards(AuthGuard, PermissionGuard)
@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) { }

	@IsPublic()
	@Get('all')
	public async getAll() {
		return await this.productService.getAllProducts()
	}

	@Roles('admin')
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
		return await this.productService.createProduct(bodyParam, file.filename);
	}

	@Roles('admin')
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
	public async update(@Body() bodyParam: any, @Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File): Promise<any> {
		const product = await this.productService.getProductById(id);
		if (product) {
			if (file) {
				fs.unlinkSync('uploads/' + product.image);
				return await this.productService.updateProduct(bodyParam, id, file.filename);
			}
			return await this.productService.updateProduct(bodyParam, id, product?.image);
		}
	}

	@IsPublic()
	@Get(':id')
	public async getById(@Param('id', ParseIntPipe) id: number): Promise<ProductEntity> {
		return await this.productService.getProductById(id);
	}

	@Roles('admin')
	@Delete('delete/:id')
	public async deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<any> {
		const product = await this.productService.getProductById(id);
		if (product) {
			const files = await fs.promises.readdir('uploads');
			fs.unlinkSync('uploads/' + product.image);
			await this.productService.deleteProduct(id);
		}
	}

	@IsPublic()
	@Get('uploads/:path')
	public getImage(@Param() path: any, @Res() res: Response) {
		res.sendFile(path.path, { root: 'uploads' });
	}
}