import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entity/products.enity';
import { ProductColorImageEntity } from './entity/productColors.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, ProductColorImageEntity]),UserModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule { }
