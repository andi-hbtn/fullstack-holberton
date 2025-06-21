import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entity/products.entity';
import { ProductColorImageEntity } from './entity/productColors.entity';
import { Repository } from 'typeorm';
import { ServiceHandler } from 'src/errorHandler/service.error';
import { ProductDto } from "./dto/product.dto";
import { ProductResponse, ProductColorResponse, DeleteProductResponse } from './responseType/response.interface';
import * as fs from "fs"
@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(ProductEntity) private readonly ProductEntity: Repository<ProductEntity>,
		@InjectRepository(ProductColorImageEntity) private readonly ColorImageRepo: Repository<ProductColorImageEntity>
	) { }

	public async getAllProducts(): Promise<any> {
		try {
			const result = await this.ProductEntity.find({
				relations: ['category', 'colorImages']
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

	public async updateProduct(data: ProductDto, id: number, file: string): Promise<any> {
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
			const result = await this.ProductEntity.findOne({ where: { id }, relations: ['category', 'colorImages'] });
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

	public async deleteProduct(id: number): Promise<DeleteProductResponse> {
		try {
			const result = await this.ProductEntity.findOne({ where: { id }, relations: ['colorImages'] });
			if (!result) {
				throw new ServiceHandler("this category does not exist", HttpStatus.NOT_FOUND);
			}

			if (fs.existsSync(`uploads/${result.image}`)) {
				// console.log("result.image--", result.image);
				fs.unlinkSync(`uploads/${result.image}`);
			}

			if (result.colorImages.length > 0) {
				result.colorImages.forEach((el) => {
					// console.log("color_image--", el.color_image);
					// console.log("product_color_image--", el.product_color_image);
					if (fs.existsSync(`uploads/colors/${el.color_image}`) || fs.existsSync(`uploads/colors/${el.product_color_image}`)) {
						fs.unlinkSync(`uploads/colors/${el.color_image}`);
						fs.unlinkSync(`uploads/colors/${el.product_color_image}`);
					}
				})
			}
			await this.ProductEntity.delete(id);
			return {
				statusCode: 200,
				message: "Product was successfully deleted"
			};
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
			// Find product in database
			const product = await this.ProductEntity.findOne({ where: { id: productId } });
			if (!product) {
				// Clean up files if product not found
				files.forEach(file => {
					if (fs.existsSync(`uploads / colors / ${file.filename}`)) {
						fs.unlinkSync(`uploads / colors / ${file.filename}`);
					}
				});
				throw new ServiceHandler("Product not found", HttpStatus.NOT_FOUND);
			}

			// Check for existing colors for this product
			const existingColors = await this.ColorImageRepo.find({ where: { product_id: productId } });
			const existingColorSet = new Set(existingColors.map(c => c.color));
			const newColorImageEntities = [];

			// Process each uploaded file and color
			for (let i = 0; i < colors.length; i++) {
				const color = colors[i];

				// Pick the two files for this color
				const colorImage = files[i * 2];
				const mainImage = files[i * 2 + 1];

				// Skip if color already exists
				if (existingColorSet.has(color)) {
					if (colorImage) fs.existsSync(`uploads / colors / ${colorImage.filename}`) && fs.unlinkSync(`uploads / colors / ${colorImage.filename}`);
					if (mainImage) fs.existsSync(`uploads / colors / ${mainImage.filename}`) && fs.unlinkSync(`uploads / colors / ${mainImage.filename}`);
					continue;
				}

				newColorImageEntities.push({
					color,
					color_image: colorImage.filename,
					product_color_image: mainImage.filename,
					product_id: productId,
				});
			}

			// If no new entities to save, throw an error
			if (newColorImageEntities.length === 0) {
				throw new ServiceHandler('All provided colors already exist for this product.', HttpStatus.CONFLICT);
			}

			// Save new color images to the database
			const result = await this.ColorImageRepo.save(newColorImageEntities);

			return {
				status: HttpStatus.OK,
				message: 'Color images uploaded successfully',
				data: result,
			};
		} catch (error) {
			// Log errors for debugging
			console.error("Error in uploadProductColors:", error);
			throw new ServiceHandler(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
		}


	}

}
