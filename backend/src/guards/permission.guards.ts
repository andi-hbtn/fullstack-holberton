import { Injectable , CanActivate,ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserService } from "src/user/user.service";
import { ServiceHandler } from "../errorHandler/service.error";
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class PermissionGuard implements CanActivate{
    constructor(
        private reflector : Reflector,
        private readonly userService:UserService
    ){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean>  {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if(roles[0] !== user[0].roles){
            throw new ServiceHandler('you does not have permissions',HttpStatus.UNAUTHORIZED)
        } 
        return true;
    }
}