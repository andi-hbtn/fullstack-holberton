import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, UseGuards, UseInterceptors, UploadedFile, Res, HttpStatus } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entity/category.entity';
import { CategoryDto } from './dto/category.dto';
import { AuthGuard } from 'src/guards/auth.guards';
import { PermissionGuard } from 'src/guards/permission.guards';
import { Roles } from 'src/decorators/roles.decorator';
import { IsPublic } from 'src/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ImageNameHelper } from 'src/helpers/imageName.helper';
import { Response } from 'express';
import { ServiceHandler } from 'src/errorHandler/service.error';
import * as fs from "fs";

@UseGuards(AuthGuard, PermissionGuard)
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
	@UseInterceptors(FileInterceptor('image', {
		storage: diskStorage({
			destination: './uploads',
			filename: (req, image, cb) => {
				const imageName = new ImageNameHelper(image.originalname).getImageName();
				cb(null, imageName);
			}
		}),
	}))
	public async create(@Body() bodyParam: CategoryDto, @UploadedFile() file: Express.Multer.File) {
		try{
			if (!file.filename) {
				throw new ServiceHandler('Image file is required', HttpStatus.BAD_REQUEST);
			}
			const category = {
				title: bodyParam.title,
				description: bodyParam.description,
				image: file.filename
			}
			return await this.categoryService.createCategory(category);
		}catch(error){
			throw new ServiceHandler('Image file is required', HttpStatus.BAD_REQUEST);
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
		}),
	}))
	public async update(@Body() bodyParam: CategoryDto, @Param('id', ParseIntPipe) id: number,@UploadedFile() file: Express.Multer.File) {
		try {
			const category = await this.categoryService.getCategoryById(id);

			if (!category) {
			  throw new ServiceHandler('This category does not exist', HttpStatus.NOT_FOUND);
			}
			if (!file?.filename) {
			  throw new ServiceHandler('Image file is required', HttpStatus.BAD_REQUEST);
			}
			// Delete the old image
			fs.unlinkSync('uploads/' + category.image);
			// Proceed with the update
			return await this.categoryService.updateCategory(bodyParam, id, file.filename);
		} catch (error) {
			console.log("error---",error.status);
			throw new ServiceHandler(error.response, error.status);
		}
	}

	@IsPublic()
	@Get(':id')
	public async getById(@Param() id: number): Promise<CategoryEntity> {
		return await this.categoryService.getCategoryById(id);
	}

	@Roles('admin')
	@Delete('delete/:id')
	public async deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<any> {
		return await this.categoryService.deleteCategory(id);
	}


	@IsPublic()
	@Get('uploads/:path')
	public getImage(@Param() path: any, @Res() res: Response) {
		res.sendFile(path.path, { root: 'uploads' });
	}
}
