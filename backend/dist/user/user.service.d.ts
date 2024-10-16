import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly userService;
    constructor(userService: Repository<UserEntity>);
    register(): Promise<void>;
    login(): Promise<void>;
    logout(): Promise<void>;
}
