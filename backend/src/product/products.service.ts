import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entity/products.enity';
import { Repository } from 'typeorm';
import { ServiceHandler } from 'src/errorHandler/service.error';
import { ProductDto } from "./dto/product.dto";

@Injectable()
export class ProductService {
	constructor(@InjectRepository(ProductEntity) private readonly ProductEntity: Repository<ProductEntity>) { }

	public async getAllProducts(): Promise<ProductEntity[]> {
		try {
			const result = await this.ProductEntity.find({
				relations:['category']
			});
			return result;
		} catch (error) {
			throw new ServiceHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public async createProduct(data: ProductDto,file:string): Promise<any> {
		try {
			const product={
				title:data.title,
				description:data.description,
				price:data.price,
				stock:data.stock,
				category_id:data.category_id,
				is_active:data.is_active,
				image:file
			};

			// console.log("product-----",product);
			const result = await this.ProductEntity.save(product);
			return result;
		} catch (error) {
			console.log("error-----",error);
			throw new ServiceHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public async updateProduct(data: ProductDto, id: number,file?:string): Promise<ProductEntity> {
		try {
			const result = await this.ProductEntity.findOne({ where: { id } });
			if (!result) {
				throw new ServiceHandler("This is category does not longer Exist", HttpStatus.NOT_FOUND);
			}
			const product = {
				title:data.title,
				description:data.description,
				price:data.price,
				is_active:data.is_active,
				category_id:data.category_id,
				image:file
			}
			await this.ProductEntity.update(id, product);
			const updatedCategory = await this.ProductEntity.findOne({ where: { id } });
			return updatedCategory;
		} catch (error) {
			throw new ServiceHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public async getProductById(id: number): Promise<ProductEntity> {
		try {
			const result = await this.ProductEntity.findOne({ where: { id } });
			if (!result) {
				throw new ServiceHandler("this product does not exist", HttpStatus.NOT_FOUND);
			}
			return result;
		} catch (error) {
			throw new ServiceHandler(error.message, HttpStatus.NOT_FOUND);
		}
	}

	public async deleteProduct(id: number): Promise<any> {
		try {
			const result = this.ProductEntity.findOne({ where: { id } });
			if (!result) {
				throw new ServiceHandler("this category does not exist", HttpStatus.NOT_FOUND);
			}
			await this.ProductEntity.delete(id);
			return result;
		} catch (error) {
			throw new ServiceHandler(error.message, HttpStatus.NOT_FOUND);
		}
	}
}
