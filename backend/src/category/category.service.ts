import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entity/category.entity';
import { Repository } from 'typeorm';
import { ServiceHandler } from 'src/errorHandler/service.error';
import { HttpStatus } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { CategoryResponse, DeleteCategoryResponse } from './responseType/response.interface';
import * as fs from "fs";

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

	public async createCategory(data: CategoryDto): Promise<CategoryResponse> {
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

	public async updateCategory(data: CategoryDto, id: number, file?: string): Promise<CategoryResponse> {
		try {
			const category = { title: data.title, description: data.description, image: file }
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

	public async getCategoryById(id: number): Promise<CategoryResponse> {
		try {
			const result = await this.categoryRepository.findOne({ where: { id } })
			if (!result) {
				throw new ServiceHandler("this category does not exist", HttpStatus.NOT_FOUND);
			}
			return {
				statusCode: HttpStatus.CREATED,
				message: 'Category exists',
				data: result
			};
		} catch (error) {
			throw new ServiceHandler(error.message, HttpStatus.NOT_FOUND);
		}
	}

	public async deleteCategory(id: number): Promise<DeleteCategoryResponse> {
		try {
			const result = await this.categoryRepository.findOne({ where: { id } });
			if (!result) {
				throw new ServiceHandler("this category does not exist", HttpStatus.NOT_FOUND);
			}
			fs.unlinkSync('uploads/' + result.image);
			await this.categoryRepository.delete(id);
			return {
				statusCode: 200,
				message: "Category deleted successfully"
			};
		} catch (error) {
			throw new ServiceHandler(error.message, HttpStatus.NOT_FOUND);
		}
	}
}