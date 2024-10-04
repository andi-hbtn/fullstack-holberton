import { HttpException } from "@nestjs/common";
export declare class ServiceHandler extends HttpException {
    constructor(message: string, httpStatus: number);
}
