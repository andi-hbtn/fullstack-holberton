import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { CategoryEntity } from './category/entity/category.entity';
import { ProductEntity } from './product/entity/products.enity';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'andi',
      database: 'glass-shop',
      entities: [CategoryEntity, ProductEntity, UserEntity],
      synchronize: true,
      autoLoadEntities: true
    })
    , ProductModule, CategoryModule, UserModule, AuthModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
