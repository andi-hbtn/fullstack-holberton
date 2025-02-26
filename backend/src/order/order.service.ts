import { Injectable } from '@nestjs/common';
import { OrderEntity } from './entity/order.entity';
import { OrderDto } from './dto/order.dto';
import { OrderItem } from './entity/order-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity) private readonly ordersRepository:Repository<OrderEntity>,
    ){}

    public async create(orderData: Partial<OrderDto>): Promise<OrderEntity> {
        const newOrder = this.ordersRepository.create(orderData);
        return this.ordersRepository.save(newOrder);
    }

    public async findOne(id:number):Promise<OrderEntity>{
        return this.ordersRepository.findOne({where:{id},relations:['users','orderItem']})
    }

    public async findAll():Promise<OrderEntity[]>{
        return this.ordersRepository.find({ relations: ['user', 'orderItem'] });
    }


}
