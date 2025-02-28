import { CanActivate, Injectable, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }
    canActivate(context: ExecutionContext) {
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

        const jwt_verify = this.jwtService.verify(jwt);
        if (jwt_verify) {
            return true
        }
        return false;
    }
}