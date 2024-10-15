import { AuthorEntity } from './entity/author.entity';
import { Repository } from 'typeorm';
import { AuthorDto } from "./dto/author.dto";
export declare class AuthorService {
    private readonly authorRepository;
    constructor(authorRepository: Repository<AuthorEntity>);
    getAllAuthors(): Promise<AuthorEntity[]>;
    createAuthor(data: AuthorDto): Promise<AuthorEntity>;
    updateAuthor(data: AuthorDto, id: number): Promise<AuthorEntity>;
    getAuthorById(id: number): Promise<AuthorEntity>;
    deleteAuthor(id: number): Promise<any>;
}
