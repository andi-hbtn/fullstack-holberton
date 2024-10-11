import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { CategoryEntity } from './category/entity/category.entity';
import { BookEntity } from './books/entity/books.enity';
import { BookModule } from './books/books.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Andi1990+',
      database: 'holberton-fullstack',
      entities: [CategoryEntity, BookEntity],
      synchronize: true,
      autoLoadEntities: true
    })
    , BookModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
