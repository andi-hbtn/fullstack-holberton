import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import {OrderEntity} from "./entity/order.entity";
import { OrderItem } from './entity/order-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([OrderEntity,OrderItem])],
  controllers: [OrderController],
  providers: [OrderService],
  exports:[OrderService]
})
export class OrderModule {}
