import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { OrderEntity } from "./entity/order.entity";
import { ProductEntity } from 'src/product/entity/products.entity';
import { OrderItemEntity } from './entity/order_item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, OrderEntity, ProductEntity, OrderItemEntity])],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService]
})
export class OrderModule { }