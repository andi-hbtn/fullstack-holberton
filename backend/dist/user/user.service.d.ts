import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
export declare class UserService {
    private readonly userService;
    constructor(userService: Repository<UserEntity>);
    findByEmail(email: string): Promise<UserEntity>;
    registerUser(data: UserDto): Promise<UserEntity>;
}
