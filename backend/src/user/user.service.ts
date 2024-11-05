import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
@Injectable()
export class UserService {
	constructor(@InjectRepository(UserEntity) private readonly userService: Repository<UserEntity>) { }

	public async findByEmail(email: string): Promise<UserEntity> {
		const result = await this.userService.findOneBy({ email })
		return result;
	}

	public async registerUser(data: UserDto): Promise<UserEntity> {
		const result = await this.userService.save(data);
		return result;
	}

	public async findById(id: number): Promise<UserEntity[]> {
		const result = await this.userService.findBy({id});
		return result;
	}
}