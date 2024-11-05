import { Injectable } from '@nestjs/common';
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private jwtService:JwtService) { }

    public async authUserId(request: Request): Promise<number> {
        const cookie = request.cookies?.jwt;
        const { id } = await this.jwtService.verifyAsync(cookie);
        return id;
    }
}
