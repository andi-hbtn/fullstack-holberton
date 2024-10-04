import { CategoryEntity } from './entity/category.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto/category.dto';
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<CategoryEntity>);
    getAllCategory(): Promise<CategoryEntity[]>;
    createCategory(data: CategoryDto): Promise<CategoryEntity>;
    updateCategory(data: CategoryDto, id: number): Promise<CategoryEntity>;
    getCategoryById(id: number): Promise<CategoryEntity>;
    deleteCategory(id: number): Promise<any>;
}
