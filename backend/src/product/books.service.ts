import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entity/products.enity';
import { Repository } from 'typeorm';
import { ServiceHandler } from 'src/errorHandler/service.error';
import { ProductDto } from "./dto/product.dto";

@Injectable()
export class BookService {
	constructor(@InjectRepository(ProductEntity) private readonly ProductEntity: Repository<ProductEntity>) { }

	public async getAllBooks(): Promise<ProductEntity[]> {
		try {
			const result = await this.ProductEntity.find({
				relations:['category','author']
			});
			return result;
		} catch (error) {
			throw new ServiceHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public async createBooks(data: ProductDto,file:string): Promise<any> {
		try {
			const book={
				title:data.title,
				description:data.description,
				price:data.price,
				category_id:data.category_id,
				author_id:data.author_id,
				is_active:data.is_active,
				image:file
			};
			const result = await this.ProductEntity.save(book);
			return result;
		} catch (error) {
			console.log("error-----",error);
			throw new ServiceHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public async updateBooks(data: ProductDto, id: number,file?:string): Promise<ProductEntity> {
		try {
			const category = await this.ProductEntity.findOne({ where: { id } });
			if (!category) {
				throw new ServiceHandler("This is category does not longer Exist", HttpStatus.NOT_FOUND);
			}
			const book = {
				title:data.title,
				description:data.description,
				price:data.price,
				is_active:data.is_active,
				category_id:data.category_id,
				author_id:data.author_id,
				image:file
			}
			await this.ProductEntity.update(id, book);
			const updatedCategory = await this.ProductEntity.findOne({ where: { id } });
			return updatedCategory;
		} catch (error) {
			throw new ServiceHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public async getBookById(id: number): Promise<ProductEntity> {
		try {
			const result = this.ProductEntity.findOne({ where: { id } })
			if (!result) {
				throw new ServiceHandler("this category does not exist", HttpStatus.NOT_FOUND);
			}
			return result
		} catch (error) {
			throw new ServiceHandler(error.message, HttpStatus.NOT_FOUND);
		}
	}

	public async deleteBook(id: number): Promise<any> {
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
