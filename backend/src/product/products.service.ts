import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entity/products.entity';
import { ProductColorImageEntity } from './entity/productColors.entity';
import { Repository } from 'typeorm';
import { ServiceHandler } from 'src/errorHandler/service.error';
import { ProductDto } from "./dto/product.dto";
import { ProductResponse, AllProductResponse, ProductColorResponse, DeleteProductResponse } from './responseType/response.interface';
import * as fs from "fs"
@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(ProductEntity) private readonly ProductEntity: Repository<ProductEntity>,
		@InjectRepository(ProductColorImageEntity) private readonly ColorImageRepo: Repository<ProductColorImageEntity>
	) { }

	public async getAllProducts(): Promise<AllProductResponse> {
		try {
			const result = await this.ProductEntity.find({
				relations: ['category', 'colorImages']
			});
			return {
				status: HttpStatus.OK,
				message: 'Product created successfully',
				data: result
			};
		} catch (error) {
			throw new ServiceHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public async createProduct(data: ProductDto): Promise<ProductResponse> {
		try {
			const result = await this.ProductEntity.save(data);
			return {
				status: HttpStatus.OK,
				message: 'Product created successfully',
				data: result
			};
		} catch (error) {
			console.log("error-----", error);
			throw new ServiceHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public async updateProduct(data: ProductDto, id: number, image: string): Promise<any> {
		try {
			const product = {
				title: data.title,
				description: data.description,
				is_active: data.is_active,
				category_id: data.category_id,
				image: image
			}
			await this.ProductEntity.update(id, product);
			const result = await this.ProductEntity.findOne({ where: { id } });
			return {
				status: HttpStatus.OK,
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
				status: HttpStatus.OK,
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
				throw new ServiceHandler("this product does not exist", HttpStatus.NOT_FOUND);
			}

			if (result.colorImages.length > 0) {
				result.colorImages.forEach((el) => {
					if (fs.existsSync(`uploads/colors/${el.color_image}`) || fs.existsSync(`uploads/colors/${el.product_color_image}`)) {
						fs.unlinkSync(`uploads/colors/${el.color_image}`);
						fs.unlinkSync(`uploads/colors/${el.product_color_image}`);
					}
				})
			}

			if (result.image) {
				if (fs.existsSync(`uploads/${result.image}`)) {
					fs.unlinkSync(`uploads/${result.image}`);
				}
			}

			await this.ProductEntity.delete(id);
			return {
				status: 200,
				message: "Product was successfully deleted"
			};
		} catch (error) {
			throw new ServiceHandler(error.message, HttpStatus.NOT_FOUND);
		}
	}

	public async uploadColorImages(
		productId: number,
		files: Express.Multer.File[],
		colors: { color: string, price: number, stock: number }[]
	): Promise<any> {
		try {
			const product = await this.ProductEntity.findOne({ where: { id: productId } });
			if (!product) {
				files.forEach(file => {
					if (fs.existsSync(`uploads/colors/${file.filename}`)) {
						fs.unlinkSync(`uploads/colors/${file.filename}`);
					}
				});
				throw new ServiceHandler("Product not found", HttpStatus.NOT_FOUND);
			}

			const existingColors = await this.ColorImageRepo.find({ where: { product_id: productId } });
			const existingColorSet = new Set(existingColors.map(c => c.color));
			const newColorImageEntities = [];

			for (let i = 0; i < colors.length; i++) {
				const { color, price, stock } = colors[i];
				const colorImage = files[i * 2];
				const mainImage = files[i * 2 + 1];

				if (existingColorSet.has(color)) {
					if (colorImage) fs.existsSync(`uploads/colors/${colorImage.filename}`) && fs.unlinkSync(`uploads/colors/${colorImage.filename}`);
					if (mainImage) fs.existsSync(`uploads/colors/${mainImage.filename}`) && fs.unlinkSync(`uploads/colors/${mainImage.filename}`);
					continue;
				}

				newColorImageEntities.push({
					color,
					color_image: colorImage.filename,
					product_color_image: mainImage.filename,
					product_id: productId,
					price,
					stock,
				});
			}

			if (newColorImageEntities.length === 0) {
				throw new ServiceHandler('All provided colors already exist for this product.', HttpStatus.CONFLICT);
			}

			const result = await this.ColorImageRepo.save(newColorImageEntities);

			return {
				status: HttpStatus.OK,
				message: 'Color images uploaded successfully',
				data: result,
			};
		} catch (error) {
			console.error("Error in uploadProductColors:", error);
			throw new ServiceHandler(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
