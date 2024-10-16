import { Injectable } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
	constructor(@InjectRepository(UserEntity) private readonly userService: Repository<UserEntity>) { }

	public async register() {

	}

	public async login() {

	}

	public async logout() { 

	}
}