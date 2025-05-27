import { Injectable, HttpStatus, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './entity/order.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { ProductEntity } from 'src/product/entity/products.enity';
import { OrderItemEntity } from './entity/order_item.entity';
import { OrderDto } from './dto/order.dto';
import { ServiceHandler } from 'src/errorHandler/service.error';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(OrderEntity) private readonly ordersRepository: Repository<OrderEntity>,
    @InjectRepository(ProductEntity) private readonly productsRepository: Repository<ProductEntity>,
    @InjectRepository(OrderItemEntity) private readonly orderItemsRepository: Repository<OrderItemEntity>,
    private configService: ConfigService
  ) { }

  public async create(orderData: OrderDto): Promise<any> {
    try {
      const { user_id, items, total_price, status, created_at } = orderData;
      let user: UserEntity | null = null;
      if (user_id) {
        user = await this.usersRepository.findOne({ where: { id: user_id } });
      }

      // Create OrderEntity instance
      const order = this.ordersRepository.create({
        user, // Assign the full entity, not just the ID
        total_price,
        status,
        created_at,
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
      const orderItem = await this.orderItemsRepository.save(orderItems);
      await this.sendOrderWithEmail(savedOrder, orderItem);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Order was successfully created',
        data: savedOrder
      };
    } catch (error) {
      throw new ServiceHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async updateStatus(id: number, status: string): Promise<any> {
    try {

      const validStatuses = ['pending', 'shipped', 'delivered', 'cancelled'];
      if (!validStatuses.includes(status)) {
        throw new ServiceHandler(`Invalid status: ${status}`, HttpStatus.NOT_FOUND);
      }

      const order = await this.ordersRepository.findOne({ where: { id } });
      if (!order) {
        throw new ServiceHandler('Order not found', HttpStatus.NOT_FOUND);
      }

      await this.ordersRepository.update(id, { status: status });

      return await this.ordersRepository.findOne({
        where: { id },
        relations: ['user', 'orderItems']
      });

    } catch (error) {
      throw new ServiceHandler(error.response, error.status);
    }
  }

  public async findOne(id: number): Promise<OrderEntity> {
    return this.ordersRepository.findOne({
      where: { id }, relations: {
        user: true,
        orderItems: {
          product: {
            category: true
          },
        }
      }
    })
  }

  public async findAll(): Promise<OrderEntity[]> {
    return this.ordersRepository.find({
      relations: {
        user: true,
        orderItems: {
          product: {
            category: true
          },
        }
      }
    });
  }

  public async sendOrderWithEmail(order: OrderEntity, items: OrderItemEntity[]): Promise<any> {
    const transporter = nodemailer.createTransport({
      service: this.configService.get<string>('EMAIL_SERVICE'),
      host: this.configService.get<string>('EMAIL_HOST'),
      port: parseInt(this.configService.get<string>('EMAIL_PORT')),
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });


    const itemRows = items.map(item => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${item.product.title}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${item.quantity}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">$${item.price.toFixed(2)}</td>
      </tr>
    `).join('');

    const htmlContent =
      `<div style="font-family: Arial, sans-serif; padding: 20px;" >
      <h2>Thank you for your order! </h2>
        < p > Your order has been successfully placed on < strong > ${new Date(order.created_at).toLocaleDateString()} </strong>.</p >
          <h3>Order Summary </h3>
            <table style = "border-collapse: collapse; width: 100%;" >
              <thead>
                  <tr>
                    <th style="text-align: left; padding: 8px; border: 1px solid #ddd;"> Product </th>
                    <th style = "text-align: left; padding: 8px; border: 1px solid #ddd;"> Quantity </th>
                    <th style = "text-align: left; padding: 8px; border: 1px solid #ddd;"> Price </th>
                  </tr>
              </thead>
              <tbody>
                    ${itemRows}
              </tbody>
              </table>

      <p style ="margin-top: 20px;"> <strong>Total: </strong> $${order.total_price.toFixed(2)}</p>
      <p>If you have any questions, feel free to contact us.</p>
      <p style="margin-top: 40px;"> Best regards, <br/>Your Company</p>
      </div>`

    await transporter.sendMail({
      from: this.configService.get<string>('EMAIL_OWNER'),
      to: this.configService.get<string>('EMAIL_OWNER'),
      subject: 'New Order',
      html: htmlContent,
    });
  }
}