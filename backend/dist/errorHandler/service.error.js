"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceHandler = void 0;
const common_1 = require("@nestjs/common");
class ServiceHandler extends common_1.HttpException {
    constructor(message, httpStatus) {
        super(message, httpStatus);
    }
}
exports.ServiceHandler = ServiceHandler;
//# sourceMappingURL=service.error.js.map