import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entity/category.entity';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) { }

	@Get('all')
	public async getAll(): Promise<CategoryEntity[]> {
		return await this.categoryService.getAllCategory();
	}

	@Post('create')
	public async create(@Body() bodyParam: CategoryDto): Promise<CategoryEntity> {
		return await this.categoryService.createCategory(bodyParam);
	}

	@Put('update/:id')
	public async update(@Body() bodyParam: CategoryDto, @Param() id: number): Promise<CategoryEntity> {
		return await this.categoryService.updateCategory(bodyParam, id);
	}

	@Get('get/:id')
	public async getById(@Param() id: number): Promise<CategoryEntity> {
		return await this.categoryService.getCategoryById(id);
	}

	@Delete('id')
	public async deleteCategory(@Param() id: number): Promise<any> {
		return await this.categoryService.deleteCategory(id);
	}
}
