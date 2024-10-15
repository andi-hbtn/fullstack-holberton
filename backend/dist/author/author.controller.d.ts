import { AuthorService } from './author.service';
import { AuthorEntity } from './entity/author.entity';
import { AuthorDto } from './dto/author.dto';
export declare class AuthorController {
    private readonly authorService;
    constructor(authorService: AuthorService);
    getAll(): Promise<AuthorEntity[]>;
    create(bodyParam: AuthorDto): Promise<AuthorEntity>;
    update(bodyParam: AuthorDto, id: number): Promise<AuthorEntity>;
    getById(id: number): Promise<AuthorEntity>;
    deleteCategory(id: number): Promise<any>;
}
