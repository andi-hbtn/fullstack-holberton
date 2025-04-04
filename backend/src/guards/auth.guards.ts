import { CanActivate, Injectable, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private userService:UserService) { }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const jwt = request.cookies.jwt;
        if (!jwt) {
            throw new HttpException("unauthorieze", HttpStatus.UNAUTHORIZED)
        }
        const decodedToken: any = this.jwtService.decode(jwt);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTime) {
            throw new HttpException("Token expired", HttpStatus.UNAUTHORIZED);
        }

        try {
            const payload: any = this.jwtService.verify(jwt);
            const user = await this.userService.findById(payload.id);
        
            if (!user) {
              throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
            }
            request.user = user;
            return true;
        } catch (err) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
    }
}