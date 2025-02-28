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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("./entity/category.entity");
const typeorm_2 = require("typeorm");
const service_error_1 = require("../errorHandler/service.error");
const common_2 = require("@nestjs/common");
let CategoryService = class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async getAllCategory() {
        try {
            const result = await this.categoryRepository.find();
            return result;
        }
        catch (error) {
            throw new service_error_1.ServiceHandler(error.message, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createCategory(data) {
        try {
            const result = await this.categoryRepository.save(data);
            return result;
        }
        catch (error) {
            throw new service_error_1.ServiceHandler(error.message, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateCategory(data, id) {
        try {
            const category = await this.categoryRepository.findOne({ where: { id } });
            if (!category) {
                throw new service_error_1.ServiceHandler("This is category does not longer Exist", common_2.HttpStatus.NOT_FOUND);
            }
            await this.categoryRepository.update(id, data);
            const updatedCategory = await this.categoryRepository.findOne({ where: { id } });
            return updatedCategory;
        }
        catch (error) {
            throw new service_error_1.ServiceHandler(error.message, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getCategoryById(id) {
        try {
            const result = this.categoryRepository.findOne({ where: { id } });
            if (!result) {
                throw new service_error_1.ServiceHandler("this category does not exist", common_2.HttpStatus.NOT_FOUND);
            }
            return result;
        }
        catch (error) {
            throw new service_error_1.ServiceHandler(error.message, common_2.HttpStatus.NOT_FOUND);
        }
    }
    async deleteCategory(id) {
        try {
            const result = await this.categoryRepository.delete(id);
            return result;
        }
        catch (error) {
            throw new service_error_1.ServiceHandler(error.message, common_2.HttpStatus.NOT_FOUND);
        }
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.CategoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryService);
//# sourceMappingURL=category.service.js.map