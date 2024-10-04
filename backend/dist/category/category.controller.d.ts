import { CategoryService } from './category.service';
import { CategoryEntity } from './entity/category.entity';
import { CategoryDto } from './dto/category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getAll(): Promise<CategoryEntity[]>;
    create(bodyParam: CategoryDto): Promise<CategoryEntity>;
    update(bodyParam: CategoryDto, id: number): Promise<CategoryEntity>;
    getById(id: number): Promise<CategoryEntity>;
    deleteCategory(id: number): Promise<any>;
}
