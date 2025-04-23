import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entity/category.entity';
import { Repository } from 'typeorm';
import { ServiceHandler } from 'src/errorHandler/service.error';
import { HttpStatus } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryResponse } from './responseType/response.interface';

@Injectable()
export class CategoryService {
	constructor(@InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>) { }

	public async getAllCategory(): Promise<CategoryEntity[]> {
		try {
			const result = await this.categoryRepository.find();
			return result;
		} catch (error) {
			throw new ServiceHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public async createCategory(data: CategoryDto): Promise<CreateCategoryResponse> {
		try {
			const result = await this.categoryRepository.save(data);
			return {
				statusCode: HttpStatus.CREATED,
				message: 'Category created successfully',
				data: result
			};
		} catch (error) {
			throw new ServiceHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public async updateCategory(data: CategoryDto, id: number,file?:string) {
		try {
			const category = {title:data.title,description:data.description,image:file}
			await this.categoryRepository.update(id, category);
			const result = await this.categoryRepository.findOne({ where: { id } });
			return {
				statusCode: HttpStatus.CREATED,
				message: 'Category updated successfully',
				data: result
			};
		} catch (error) {
			throw new ServiceHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public async getCategoryById(id: number): Promise<CategoryEntity> {
		try {
			const result = this.categoryRepository.findOne({ where: { id } })
			if (!result) {
				throw new ServiceHandler("this category does not exist", HttpStatus.NOT_FOUND);
			}
			return result
		} catch (error) {
			throw new ServiceHandler(error.message, HttpStatus.NOT_FOUND);
		}
	}

	public async deleteCategory(id: number): Promise<any> {
		try {
			// const result = this.categoryRepository.findOne({ where: { id } });
			// if (!result) {
			// 	throw new ServiceHandler("this category does not exist", HttpStatus.NOT_FOUND);
			// }
			const result = await this.categoryRepository.delete(id);
			return result;
		} catch (error) {
			throw new ServiceHandler(error.message, HttpStatus.NOT_FOUND);
		}
	}
}