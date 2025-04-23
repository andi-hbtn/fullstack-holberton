import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [CategoryEntity, ProductEntity, UserEntity],
        synchronize: true,
        autoLoadEntities: true,

      })
    })
    , ProductModule, CategoryModule, UserModule, AuthModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
