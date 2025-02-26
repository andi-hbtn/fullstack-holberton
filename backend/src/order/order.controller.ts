import { Body, Controller,Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import {OrderDto} from "./dto/order.dto";
import { OrderEntity } from './entity/order.entity';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService:OrderService){}

    @Get()
    public async findAll(): Promise<OrderEntity[]> {
      return this.orderService.findAll();
    }
  
    @Get(':id')
    public async findOne(@Param('id') id: number): Promise<OrderEntity> {
      return this.orderService.findOne(id);
    }
  
    @Post()
    public async create(@Body() orderData: OrderDto): Promise<OrderEntity> {
      return this.orderService.create(orderData);
    }

}
