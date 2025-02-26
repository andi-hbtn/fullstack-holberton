import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
@Injectable()
export class  UserService{
	constructor(@InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>) { }

	public async findByEmail(email: string): Promise<UserEntity> {
		const result = await this.usersRepository.findOneBy({ email })
		return result;
	}

	public async registerUser(data: UserDto): Promise<UserEntity> {
		const result = await this.usersRepository.save(data);
		return result;
	}

	public async findById(id: number): Promise<UserEntity[]> {
		const result = await this.usersRepository.findBy({id});
		return result;
	}
}