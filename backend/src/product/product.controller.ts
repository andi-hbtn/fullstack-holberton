import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, UseGuards, UseInterceptors, Res, UploadedFile, HttpStatus, UploadedFiles } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guards';
import { PermissionGuard } from 'src/guards/permission.guards';
import { IsPublic } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { ProductService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { ProductResponse, DeleteProductResponse, DeleteProductVariantResponse } from './responseType/response.interface';
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
			const product = {
				title: bodyParam.title,
				description: bodyParam.description,
				is_active: bodyParam.is_active,
				category_id: bodyParam.category_id,
				image: file.filename
			}
			return await this.productService.createProduct(product);
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
		})
	}))
	public async update(@Body() bodyParam: ProductDto, @Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File): Promise<ProductResponse> {
		try {
			const productResponse = await this.productService.getProductById(id);
			const product = productResponse.data;

			if (!file || !file?.filename) {
				const imagePath = path.basename(product.image);
				return await this.productService.updateProduct(bodyParam, id, imagePath);
			} else {
				// Delete the old image
				const imagePath = path.basename(product.image);
				fs.unlinkSync('uploads/' + imagePath);
				// Proceed with the update
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
	public async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteProductResponse> {
		try {
			return await this.productService.deleteProduct(id);
		} catch (error) {
			throw new ServiceHandler(error.response, error.status);
		}
	}

	@Roles('admin')
	@Post('product-variants/:productId')
	@UseInterceptors(FilesInterceptor('images', 10, {
		storage: diskStorage({
			destination: './uploads/colors',
			filename: (req, file, cb) => {
				// console.log("file---", file);
				const imageName = new ImageNameHelper(file.originalname).getImageName();
				cb(null, imageName);
			}
		}),
	}))
	public async createProductVariants(
		@Param('productId', ParseIntPipe) productId: number,
		@UploadedFiles() files: Express.Multer.File[],
		@Body() bodyParam: any
	) {
		try {
			const parsed = JSON.parse(bodyParam.productVariants);
			return await this.productService.uploadColorVariants(productId, files, parsed);
		} catch (error) {
			throw new ServiceHandler(error.message, error.status);
		}
	}

	@Roles('admin')
	@Put('product-variants/')
	@UseInterceptors(FilesInterceptor('images', 10, {
		storage: diskStorage({
			destination: './uploads/colors',
			filename: (req, file, cb) => {
				const imageName = new ImageNameHelper(file.originalname).getImageName();
				cb(null, imageName);
			}
		}),
	}))
	public async updateProductVariants(
		@UploadedFiles() files: Express.Multer.File[],
		@Body() bodyParam: any
	) {
		try {
			const parsed = JSON.parse(bodyParam.productVariants);
			return await this.productService.updateColorVariants(files, parsed);
		} catch (error) {
			throw new ServiceHandler(error.message, error.status);
		}
	}

	@Roles('admin')
	@Delete('product-variants/:id')
	public async deleteProductVariant(@Param('id', ParseIntPipe) id: number): Promise<DeleteProductVariantResponse> {
		try {
			return await this.productService.deleteProductVariant(id);
		} catch (error) {
			throw new ServiceHandler(error.response, error.status);
		}
	}

	@IsPublic()
	@Get('uploads/:path')
	public getImage(@Param() path: any, @Res() res: Response) {
		res.sendFile(path.path, { root: 'uploads' });
	}

	@IsPublic()
	@Get('uploads/colors/:path')
	public getColorVariants(@Param('path') path: any, @Res() res: Response) {
		res.sendFile(path, { root: 'uploads/colors' });
	}
}