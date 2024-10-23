"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorService = void 0;
const common_1 = require("@nestjs/common");
const author_entity_1 = require("./entity/author.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const service_error_1 = require("../errorHandler/service.error");
let AuthorService = class AuthorService {
    constructor(authorRepository) {
        this.authorRepository = authorRepository;
    }
    async getAllAuthors() {
        try {
            const result = await this.authorRepository.find();
            return result;
        }
        catch (error) {
            throw new service_error_1.ServiceHandler(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createAuthor(data) {
        try {
            const result = await this.authorRepository.save(data);
            return result;
        }
        catch (error) {
            throw new service_error_1.ServiceHandler(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAuthor(data, id) {
        try {
            let result = this.authorRepository.findOne({ where: { id } });
            if (!result) {
                throw new service_error_1.ServiceHandler("this author does not exist", common_1.HttpStatus.NOT_FOUND);
            }
            await this.authorRepository.update(id, data);
            const updatedCategory = await this.authorRepository.findOne({ where: { id } });
            return updatedCategory;
            return result;
        }
        catch (error) {
            throw new service_error_1.ServiceHandler(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAuthorById(id) {
        try {
            const result = await this.authorRepository.findOne({ where: { id } });
            return result;
        }
        catch (error) {
            throw new service_error_1.ServiceHandler("this author does not exist", common_1.HttpStatus.NOT_FOUND);
        }
    }
    async deleteAuthor(id) {
        try {
            const result = await this.authorRepository.findOne({ where: { id } });
            if (!result) {
                throw new service_error_1.ServiceHandler("this author does not exist", common_1.HttpStatus.NOT_FOUND);
            }
            await this.authorRepository.delete(id);
        }
        catch (error) {
            throw new service_error_1.ServiceHandler(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AuthorService = AuthorService;
exports.AuthorService = AuthorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(author_entity_1.AuthorEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuthorService);
//# sourceMappingURL=author.service.js.map