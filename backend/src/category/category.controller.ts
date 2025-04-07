import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe,UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entity/category.entity';
import { CategoryDto } from './dto/category.dto';
import { AuthGuard } from 'src/guards/auth.guards';
import { PermissionGuard } from 'src/guards/permission.guards';
import { Roles } from 'src/decorators/roles.decorator';
import { IsPublic } from 'src/decorators/public.decorator';


@UseGuards(AuthGuard,PermissionGuard)
@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) { }

	@IsPublic()
	@Get('all')
	public async getAll(): Promise<CategoryEntity[]> {
		return await this.categoryService.getAllCategory();
	}

	@Roles('admin')
	@Post('create')
	public async create(@Body() bodyParam: CategoryDto): Promise<CategoryEntity> {
		return await this.categoryService.createCategory(bodyParam);
	}

	@Roles('admin')
	@Put('update/:id')
	public async update(@Body() bodyParam: CategoryDto, @Param('id', ParseIntPipe) id: number): Promise<CategoryEntity> {
		return await this.categoryService.updateCategory(bodyParam, id);
	}

	@IsPublic()
	@Get('get/:id')
	public async getById(@Param() id: number): Promise<CategoryEntity> {
		return await this.categoryService.getCategoryById(id);
	}

	@Roles('admin')
	@Delete('delete/:id')
	public async deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<any> {
		return await this.categoryService.deleteCategory(id);
	}
}
