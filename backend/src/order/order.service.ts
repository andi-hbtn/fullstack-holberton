import { Injectable } from '@nestjs/common';
import { OrderEntity } from './entity/order.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { ProductEntity } from 'src/product/entity/products.enity';
import { OrderItemEntity } from './entity/order_item.entity';
import { OrderDto } from './dto/order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(UserEntity) private readonly usersRepository:Repository<UserEntity>,
        @InjectRepository(OrderEntity) private readonly ordersRepository:Repository<OrderEntity>,
        @InjectRepository(ProductEntity) private readonly productsRepository:Repository<ProductEntity>,
        @InjectRepository(OrderItemEntity) private readonly orderItemsRepository:Repository<OrderItemEntity>,
    ){}

    public async create(orderData:OrderDto): Promise<OrderEntity> {
        const { user_id, items, total_price, status, createdAt } = orderData;

        let user: UserEntity | null = null;

        if (user_id) {
          user = await this.usersRepository.findOne({ where: { id: user_id } });
        }

        // Create OrderEntity instance
        const order = this.ordersRepository.create({
          user, // Assign the full entity, not just the ID
          total_price,
          status,
          createdAt,
        });

        // Save order
        const savedOrder = await this.ordersRepository.save(order);
    
        // Create order items
        const orderItems = await Promise.all(
          items.map(async (item) => {
            const product = await this.productsRepository.findOne({ where: { id: item.product_id } });
            if (!product) {
              throw new Error(`Product with ID ${item.product_id} not found`);
            }

            return this.orderItemsRepository.create({
              order: savedOrder,
              product,
              quantity: item.quantity,
              price: product.price, // Ensure price is fetched from the product
            });
          })
        );
        // Save all order items
        await this.orderItemsRepository.save(orderItems);
        return savedOrder;
    }

    public async findOne(id:number):Promise<OrderEntity>{
        return this.ordersRepository.findOne({where:{id},relations:['user','order_items']})
    }

    public async findAll():Promise<OrderEntity[]>{
        return this.ordersRepository.find({ relations: ['user', 'orderItems'] });
    }
}