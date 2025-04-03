import { Injectable,HttpStatus } from '@nestjs/common';
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import {ServiceHandler} from "../errorHandler/service.error";

@Injectable()
export class AuthService {
    constructor(private jwtService:JwtService) { }

    public async authUserId(request: Request): Promise<number> {
        const cookie = request.cookies?.jwt;
        if(typeof cookie === 'undefined'){
            throw new ServiceHandler("You are anauthorized",HttpStatus.UNAUTHORIZED);
        } else{
            const { id } = await this.jwtService.verifyAsync(cookie);
            return id;
        }
       
    }
}
