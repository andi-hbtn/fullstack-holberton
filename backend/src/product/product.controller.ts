import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, UseGuards, UseInterceptors, Res, UploadedFile, HttpStatus, UploadedFiles } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guards';
import { PermissionGuard } from 'src/guards/permission.guards';
import { IsPublic } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { ProductService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { ProductResponse } from './responseType/response.interface';
import { diskStorage } from 'multer';
import { ImageNameHelper } from '../helpers/imageName.helper';
import { Response } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as fs from "fs";
import * as path from 'path';
import { ServiceHandler } from 'src/errorHandler/service.error';


@UseGuards(AuthGuard, PermissionGuard)
@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) { }

	@IsPublic()
	@Get('all')
	public async getAll() {
		try {
			return await this.productService.getAllProducts();
		} catch (error) {
			throw new ServiceHandler(error.response, error.status);
		}
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
		try {
			if (!file || !file.filename) {
				throw new ServiceHandler('Image file is required', HttpStatus.BAD_REQUEST);
			}
			return await this.productService.createProduct(bodyParam, file.filename);
		} catch (error) {
			throw new ServiceHandler(error.response, error.status);
		}
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
	public async update(@Body() bodyParam: any, @Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File): Promise<ProductResponse> {

		try {
			const productResponse = await this.productService.getProductById(id);
			const product = productResponse.data;
			if (!file || !file?.filename) {
				const imagePath = path.basename(product.image);
				return await this.productService.updateProduct(bodyParam, id, imagePath);
			} else {
				const imagePath = path.basename(product.image);
				fs.unlinkSync('uploads/' + imagePath);
				return await this.productService.updateProduct(bodyParam, id, file.filename);
			}
		} catch (error) {
			throw new ServiceHandler(error.response, error.status);
		}
	}

	@IsPublic()
	@Get(':id')
	public async getById(@Param('id', ParseIntPipe) id: number): Promise<ProductResponse> {
		try {
			return await this.productService.getProductById(id);
		} catch (error) {
			throw new ServiceHandler(error.response, error.status);
		}
	}

	@Roles('admin')
	@Delete('delete/:id')
	public async deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<ProductResponse> {
		try {
			return await this.productService.deleteProduct(id);
		} catch (error) {
			throw new ServiceHandler(error.response, error.status);
		}
	}

	@Roles('admin')
	@Post('upload-colors/:productId')
	@UseInterceptors(FilesInterceptor('images', 10, {
		storage: diskStorage({
			destination: './uploads/colors',
			filename: (req, file, cb) => {
				const imageName = new ImageNameHelper(file.originalname).getImageName();
				cb(null, imageName);
			}
		}),
	}))
	public async uploadProductColors(
		@Param('productId', ParseIntPipe) productId: number,
		@UploadedFiles() files: Express.Multer.File[],
		@Body('colors') colors: string
	) {
		try {

			if (!colors) {
				// Clean up any uploaded files
				files.forEach(file => {
					fs.existsSync(`uploads/colors/${file.filename}`) &&
						fs.unlinkSync(`uploads/colors/${file.filename}`);
				});
				throw new ServiceHandler("Colors field is required", HttpStatus.BAD_REQUEST);
			}

			const parsedColors = JSON.parse(colors);
			console.log("parsedColors---", parsedColors);
			if (!Array.isArray(parsedColors)) {
				files.map(file => fs.unlinkSync('uploads/colors/' + file.filename));
				throw new ServiceHandler("Number of colors and images must match", HttpStatus.BAD_REQUEST);
			}

			return await this.productService.uploadColorImages(productId, files, parsedColors);
		} catch (error) {
			throw new ServiceHandler(error.message, error.status);
		}
	}

	@IsPublic()
	@Get('uploads/:path')
	public getImage(@Param() path: any, @Res() res: Response) {
		res.sendFile(path.path, { root: 'uploads' });
	}

	@IsPublic()
	@Get('uploads/colors/:path')
	public getColorImages(@Param('path') path: any, @Res() res: Response) {
		res.sendFile(path, { root: 'uploads/colors' });
	}
}
