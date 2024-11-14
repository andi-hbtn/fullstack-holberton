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
exports.BookController = void 0;
const common_1 = require("@nestjs/common");
const auth_guards_1 = require("../auth/guards/auth.guards");
const books_service_1 = require("./books.service");
const book_dto_1 = require("./dto/book.dto");
const multer_1 = require("multer");
const imageName_helper_1 = require("../helpers/imageName.helper");
const platform_express_1 = require("@nestjs/platform-express");
const fs = require("fs");
let BookController = class BookController {
    constructor(bookService) {
        this.bookService = bookService;
    }
    async getAll() {
        return await this.bookService.getAllBooks();
    }
    async cretePost(bodyParam, file) {
        return await this.bookService.createBooks(bodyParam, file.filename);
    }
    async update(bodyParam, id, file) {
        const book = await this.bookService.getBookById(id);
        if (book) {
            if (file) {
                fs.unlinkSync('uploads/' + book.image);
                return await this.bookService.updateBooks(bodyParam, id, file.filename);
            }
            return await this.bookService.updateBooks(bodyParam, id, book?.image);
        }
    }
    async getById(id) {
        return await this.bookService.getBookById(id);
    }
    async deleteCategory(id) {
        const book = await this.bookService.getBookById(id);
        if (book) {
            const files = await fs.promises.readdir('uploads');
            fs.unlinkSync('uploads/' + book.image);
            await this.bookService.deleteBook(id);
        }
    }
    getImage(path, res) {
        res.sendFile(path.path, { root: 'uploads' });
    }
};
exports.BookController = BookController;
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, image, cb) => {
                const imageName = new imageName_helper_1.ImageNameHelper(image.originalname).getImageName();
                cb(null, imageName);
            }
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_dto_1.BookDto, Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "cretePost", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, image, cb) => {
                const imageName = new imageName_helper_1.ImageNameHelper(image.originalname).getImageName();
                cb(null, imageName);
            }
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_dto_1.BookDto, Number, Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('get/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getById", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "deleteCategory", null);
__decorate([
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    (0, common_1.Get)('uploads/:path'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "getImage", null);
exports.BookController = BookController = __decorate([
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    (0, common_1.Controller)('book'),
    __metadata("design:paramtypes", [books_service_1.BookService])
], BookController);
//# sourceMappingURL=book.controller.js.map