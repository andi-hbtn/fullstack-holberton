"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_module_1 = require("./category/category.module");
const category_entity_1 = require("./category/entity/category.entity");
const books_enity_1 = require("./books/entity/books.enity");
const books_module_1 = require("./books/books.module");
const author_module_1 = require("./author/author.module");
const author_entity_1 = require("./author/entity/author.entity");
const user_module_1 = require("./user/user.module");
const user_entity_1 = require("./user/entity/user.entity");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'admin',
                password: 'root',
                database: 'holberton-fullstack',
                entities: [category_entity_1.CategoryEntity, books_enity_1.BookEntity, author_entity_1.AuthorEntity, user_entity_1.UserEntity],
                synchronize: true,
                autoLoadEntities: true
            }),
            books_module_1.BookModule, category_module_1.CategoryModule, author_module_1.AuthorModule, user_module_1.UserModule, auth_module_1.AuthModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map