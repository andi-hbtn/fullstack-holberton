import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entity/products.enity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]),UserModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule { }
