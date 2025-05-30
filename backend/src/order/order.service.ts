import { Injectable, HttpStatus, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './entity/order.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { ProductEntity } from 'src/product/entity/products.enity';
import { OrderItemEntity } from './entity/order_item.entity';
import { UserAddress } from './entity/user_address.entity';
import { UserAddressDto } from './dto/userAddress.dto';
import { OrderDto } from './dto/order.dto';
import { ServiceHandler } from 'src/errorHandler/service.error';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as puppeteer from 'puppeteer';
import { writeFileSync, unlinkSync } from 'fs';
import { join } from 'path';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(OrderEntity) private readonly ordersRepository: Repository<OrderEntity>,
    @InjectRepository(ProductEntity) private readonly productsRepository: Repository<ProductEntity>,
    @InjectRepository(OrderItemEntity) private readonly orderItemsRepository: Repository<OrderItemEntity>,
    @InjectRepository(UserAddress) private readonly userAddress: Repository<UserAddress>,
    private configService: ConfigService
  ) { }

  public async create(orderData: OrderDto): Promise<any> {
    try {
      const { user_id, items, total_price, status, created_at, firstname, lastname, email, phone, country, town, zipCode, street_address, appartment, message } = orderData;
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

      const userAddress = this.userAddress.create({
        firstname,
        lastname,
        email,
        phone,
        country,
        town,
        zipCode,
        street_address,
        appartment,
        message,
      });

      // Save all order items
      const orderItem = await this.orderItemsRepository.save(orderItems);
      await this.sendOrderWithEmail(savedOrder, orderItem, userAddress);
      await this.userAddress.save(userAddress);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Order was successfully created',
        data: savedOrder
      };
    } catch (error) {
      console.log("error--in crete order---", error);
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

  public async sendOrderWithEmail(order: OrderEntity, items: OrderItemEntity[], userAddress: UserAddressDto): Promise<any> {
    const transporter = nodemailer.createTransport({
      service: this.configService.get<string>('EMAIL_SERVICE'),
      host: this.configService.get<string>('EMAIL_HOST'),
      port: parseInt(this.configService.get<string>('EMAIL_PORT')),
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });

    console.log("userAddress-----", userAddress);

    const itemRows = items.map(item => `
      <tr>
        <td style="padding: 10px;">${item.product.title}</td>
        <td style="padding: 10px;">${item.quantity}</td>
        <td style="padding: 10px;"> &#163; ${item.price.toFixed(2)}</td>
        <td style="padding: 10px;"> &#163; ${(item.quantity * item.price).toFixed(2)}</td>
      </tr>
    `).join('');

    const htmlContent =
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background-color: #f9f9f9; padding: 20px 0;">
    <tr>
        <td align="center">
            <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
                style="background-color: #ffffff; padding: 20px; border: 1px solid #dddddd;">

                <!-- Header -->
                <tr>
                    <td style="padding-bottom: 20px;">
                        <h2 style="margin: 0; font-size: 24px; color: #333;">Quote Summary</h2>
                    </td>
                </tr>

                <!-- Customer & Order Info in 3 Horizontal Blocks -->
                <tr>
                    <td>
                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px;">
                            <tr valign="top">
                                <!-- Block 1: Customer -->
                                <td width="33.33%" style="padding: 10px; font-size: 14px; color: #333; border-bottom: 1px solid #cccccc;">
                                    <p style="margin: 0;"><strong>Customer Name:</strong><br />${userAddress.firstname} ${userAddress.lastname}</p>
                                </td>

                                <!-- Block 2: Delivery + Quote -->
                                <td width="33.33%" style="padding: 10px; font-size: 14px; color: #333;">
                                    <p style="margin: 0;"><strong>Delivery Address:</strong><br />
                                    Country: ${userAddress.country} Town: ${userAddress.town} Zipcode: ${userAddress.zipCode} 
                                    Street address: ${userAddress.street_address} Unit: ${userAddress.appartment}
                                    </p>
                                    <p style="margin: 8px 0 0;"><strong>Quote:</strong> 012090</p>
                                </td>

                                <!-- Block 3: Date + Page -->
                                <td width="33.33%" style="padding: 10px; font-size: 14px; color: #333;">
                                    <p style="margin: 0;"><strong>Date:</strong> 14/03/2025</p>
                                    <p style="margin: 8px 0 0;"><strong>Page:</strong> 1 / 1</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <!-- Order Summary -->
                <tr>
                    <td style="padding-top: 20px;">
                        <h3 style="margin-bottom: 10px; font-size: 18px; color: #333;">Order Summary</h3>
                        <p style="font-size: 14px; color: #333;"><strong>Order Date:</strong> ${new Date(order.created_at).toLocaleDateString()}</p>

                        <table width="100%" cellpadding="0" cellspacing="0" border="0"
                            style="border-collapse: collapse; margin-top: 10px;">
                            <thead>
                                <tr style="background-color: #f4f4f4;">
                                    <th align="left" style="padding: 8px; border-bottom: 1px solid #ccc;">Product</th>
                                    <th align="left" style="padding: 8px; border-bottom: 1px solid #ccc;">Quantity</th>
                                    <th align="left" style="padding: 8px; border-bottom: 1px solid #ccc;">Unit Price</th>
                                    <th align="left" style="padding: 8px; border-bottom: 1px solid #ccc;">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${itemRows}
                            </tbody>
                        </table>

                        <p style="font-size: 14px; margin-top: 20px;"><strong>Total Net:</strong> &#163; ${order.total_price.toFixed(2)}</p>
                         <p style="font-size: 14px; margin-top: 20px;"><strong>Total Vat 20%: ${order.total_price * 0.20}</strong></p>
                         <p style="font-size: 14px; margin-top: 20px;"><strong>Total Amount:   ${(order.total_price.toFixed(2) + order.total_price * 0.20)} </strong></p>
                    </td>
                </tr>
                <tr>
                  <td style="padding-top: 30px; font-size: 14px; color: #555;" >
                    <p>If you have any questions, feel free to contact us.</p>
                      <p style = "margin-top: 30px;" > Best regards, <br /><strong>London Glass Fittings</strong > </p>
                  </td>
                </tr>

            </table>
          </td>
        </tr>
    </table>
              `

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'load' });
    const pdfPath = join(__dirname, `order - ${order.id}.pdf`);
    await page.pdf({ path: pdfPath, format: 'A4' });
    await browser.close();

    await transporter.sendMail({
      from: this.configService.get<string>('EMAIL_OWNER'),
      to: this.configService.get<string>('EMAIL_OWNER'),
      subject: 'New Order',
      html: '<p>Thank you for your order! Please find the receipt attached as a PDF.</p>',
      attachments: [
        {
          filename: `order - ${order.id}.pdf`,
          path: pdfPath,
          contentType: 'application/pdf'
        }
      ]
    });

    unlinkSync(pdfPath);
  }
}