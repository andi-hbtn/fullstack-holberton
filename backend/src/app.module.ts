import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { CategoryEntity } from './category/entity/category.entity';
import { BookEntity } from './books/entity/books.enity';
import { BookModule } from './books/books.module';
import { AuthorModule } from './author/author.module';
import { AuthorEntity } from './author/entity/author.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'andi',
      database: 'holberton-fullstack',
      entities: [CategoryEntity, BookEntity, AuthorEntity],
      synchronize: true,
      autoLoadEntities: true
    })
    , BookModule, CategoryModule, AuthorModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
