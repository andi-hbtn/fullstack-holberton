import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { CategoryEntity } from './category/entity/category.entity';
import { BookEntity } from './books/entity/books.enity';
import { BookModule } from './books/books.module';
import { AuthorModule } from './author/author.module';
import { AuthorEntity } from './author/entity/author.entity';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entity/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'Andi',
      password: 'andi',
      database: 'holberton-fullstack',
      entities: [CategoryEntity, BookEntity, AuthorEntity, UserEntity],
      synchronize: true,
      autoLoadEntities: true
    })
    , BookModule, CategoryModule, AuthorModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
