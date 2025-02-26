import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { BookService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entity/products.enity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [BookService]
})
export class ProductModule { }
