import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthorEntity } from './entity/author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceHandler } from 'src/errorHandler/service.error';
import { AuthorDto } from "./dto/author.dto";

@Injectable()
export class AuthorService {
	constructor(@InjectRepository(AuthorEntity) private readonly authorRepository: Repository<AuthorEntity>) { }

	public async getAllAuthors(): Promise<AuthorEntity[]> {
		try {
			const result = await this.authorRepository.find();
			return result;
		} catch (error) {
			throw new ServiceHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public async createAuthor(data: AuthorDto): Promise<AuthorEntity> {
		try {
			const result = await this.authorRepository.save(data);
			return result;
		} catch (error) {
			throw new ServiceHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public async updateAuthor(data: AuthorDto, id: number): Promise<AuthorEntity> {
		try {
			let result = this.authorRepository.findOne({ where: { id } });
			if (!result) {
				throw new ServiceHandler("this author does not exist", HttpStatus.NOT_FOUND);
			}
			await this.authorRepository.update(id, data);
			const updatedCategory = await this.authorRepository.findOne({ where: { id } });

			return updatedCategory;
			return result;
		} catch (error) {
			throw new ServiceHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public async getAuthorById(id: number): Promise<AuthorEntity> {
		try {
			const result = await this.authorRepository.findOne({ where: { id } });
			return result;
		} catch (error) {
			throw new ServiceHandler("this author does not exist", HttpStatus.NOT_FOUND);
		}
	}

	public async deleteAuthor(id: number): Promise<any> {
		try {
			const result = await this.authorRepository.findOne({ where: { id } });
			if (!result) {
				throw new ServiceHandler("this author does not exist", HttpStatus.NOT_FOUND);
			}
			await this.authorRepository.delete(id);
		} catch (error) {
			throw new ServiceHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
