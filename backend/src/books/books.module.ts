import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entity/books.enity';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity])],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule { }
