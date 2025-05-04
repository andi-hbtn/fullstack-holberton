import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entity/products.enity';
import { ProductColorImageEntity } from './entity/productColors.entity';
import { Repository } from 'typeorm';
import { ServiceHandler } from 'src/errorHandler/service.error';
import { ProductDto } from "./dto/product.dto";
import { ProductResponse, ProductColorResponse } from './responseType/response.interface';
import * as fs from "fs"
@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(ProductEntity) private readonly ProductEntity: Repository<ProductEntity>,
		@InjectRepository(ProductColorImageEntity) private readonly ColorImageRepo: Repository<ProductColorImageEntity>
	) { }

	public async getAllProducts(): Promise<ProductEntity[]> {
		try {
			const result = await this.ProductEntity.find({
				relations: ['category']
			});
			return result;
		} catch (error) {
			throw new ServiceHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public async createProduct(data: ProductDto, file: string): Promise<ProductResponse> {
		try {
			const product = {
				title: data.title,
				description: data.description,
				price: data.price,
				stock: data.stock,
				category_id: data.category_id,
				is_active: data.is_active,
				image: file
			};
			const result = await this.ProductEntity.save(product);
			return {
				statusCode: HttpStatus.CREATED,
				message: 'Product created successfully',
				data: result
			};
		} catch (error) {
			console.log("error-----", error);
			throw new ServiceHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public async updateProduct(data: ProductDto, id: number, file?: string): Promise<any> {

		try {
			const product = {
				title: data.title,
				description: data.description,
				price: data.price,
				stock: data.stock,
				is_active: data.is_active,
				category_id: data.category_id,
				image: file
			}
			await this.ProductEntity.update(id, product);
			const result = await this.ProductEntity.findOne({ where: { id } });

			return {
				statusCode: HttpStatus.OK,
				message: 'Product updated successfully',
				data: result
			};
		} catch (error) {
			console.log("error-in update--", error);
			throw new ServiceHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public async getProductById(id: number): Promise<ProductResponse> {
		try {
			const result = await this.ProductEntity.findOne({ where: { id }, relations: ['category'] });
			if (!result) {
				throw new ServiceHandler("this product does not exist", HttpStatus.NOT_FOUND);
			}
			return {
				statusCode: HttpStatus.OK,
				message: 'Product exists',
				data: result
			};
		} catch (error) {
			throw new ServiceHandler(error.message, HttpStatus.NOT_FOUND);
		}
	}

	public async deleteProduct(id: number): Promise<any> {
		try {
			const result = await this.ProductEntity.findOne({ where: { id } });
			if (!result) {
				throw new ServiceHandler("this category does not exist", HttpStatus.NOT_FOUND);
			}
			fs.unlinkSync('uploads/' + result.image);
			await this.ProductEntity.delete(id);
			return result;
		} catch (error) {
			throw new ServiceHandler(error.message, HttpStatus.NOT_FOUND);
		}
	}


	public async uploadColorImages(
		productId: number,
		files: Express.Multer.File[],
		colors: string[]
	): Promise<any> {
		try {
			const product = await this.ProductEntity.findOne({ where: { id: productId } });
			if (!product) {
				throw new ServiceHandler("Product not found", HttpStatus.NOT_FOUND);
			}

			const existingColors = await this.ColorImageRepo.find({
				where: { product_id: productId }
			});

			const existingColorSet = new Set(existingColors.map(c => c.color));
			const newColorImageEntities = [];

			for (let i = 0; i < colors.length; i++) {
				const color = colors[i];
				const file = files[i];

				if (existingColorSet.has(color)) {
					// Optionally, delete uploaded file to prevent leftover uploads
					fs.unlinkSync(`uploads/colors/${file.filename}`);
					continue; // Skip existing color
				}

				newColorImageEntities.push({
					color,
					image: file.filename,
					product_id: productId,
				});
			}

			if (newColorImageEntities.length === 0) {
				throw new ServiceHandler('All provided colors already exist for this product.', HttpStatus.CONFLICT);
			}

			const result = await this.ColorImageRepo.save(newColorImageEntities);

			return {
				statusCode: HttpStatus.OK,
				message: 'Color images uploaded successfully',
				data: result,
			};
		} catch (error) {
			throw new ServiceHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
