import { Injectable , CanActivate,ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserService } from "src/user/user.service";

@Injectable()
export class PermissionGuard implements CanActivate{
    constructor(
        private reflector : Reflector,
        private readonly userService:UserService
    ){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean>  {
        const roles = this.reflector.get<string[]>('roles', context.getClass());
        const request = context.switchToHttp().getRequest();
        const user = request.user;
    
        console.log('User:', user);
        console.log("PermissionGuard---",roles);
        return true;
    }
}