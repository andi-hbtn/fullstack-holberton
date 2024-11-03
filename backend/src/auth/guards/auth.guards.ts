import { CanActivate, Injectable, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const jwt = request.cookies.jwt;
        console.log("--jwt---", jwt);
        if (!jwt) {
            console.log("no jwt--jwt----", jwt);
            throw new HttpException("unauthorieze", HttpStatus.UNAUTHORIZED)
        }
        const jwt_verify = this.jwtService.verify(jwt);

        if (jwt_verify) {
            return true
        }
        return false;

    }
}