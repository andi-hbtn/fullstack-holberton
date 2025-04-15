import { Injectable,HttpStatus, HttpException } from '@nestjs/common';
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import {ServiceHandler} from "../errorHandler/service.error";

@Injectable()
export class AuthService {
    constructor(private jwtService:JwtService) { }

    public async authUserId(request: Request): Promise<number> {
        try{
            const jwt = request.cookies?.jwt;
            if(!jwt){
                throw new ServiceHandler("You are anauthorized",HttpStatus.UNAUTHORIZED);
            }

            const decodedToken: any = this.jwtService.decode(jwt);
            const currentTime = Math.floor(Date.now() / 1000);

            if (decodedToken.exp < currentTime) {
                throw new HttpException("Token expired", HttpStatus.UNAUTHORIZED);
            }
            const { id } = await this.jwtService.verifyAsync(jwt);
            return id;
        }catch(error){
            throw new ServiceHandler(error.message, HttpStatus.UNAUTHORIZED);
        }
    }
}
