import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
export declare class UserService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<UserEntity>);
    findByEmail(email: string): Promise<UserEntity>;
    registerUser(data: UserDto): Promise<UserEntity>;
    findById(id: number): Promise<UserEntity[]>;
}
