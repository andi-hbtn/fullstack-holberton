import { Injectable, HttpStatus, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './entity/order.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { ProductEntity } from 'src/product/entity/products.entity';
import { ProductColorVariant } from 'src/product/entity/productColorVariants.entity';
import { OrderItemEntity } from './entity/order_item.entity';
import { OrderDto } from './dto/order.dto';
import { ServiceHandler } from 'src/errorHandler/service.error';
import { OrderByIdResposne } from './responseType/response.interface';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as PdfPrinter from 'pdfmake/src/printer';
import { TDocumentDefinitions } from 'pdfmake/interfaces';


@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity) private readonly productsRepository: Repository<ProductEntity>,
    @InjectRepository(ProductColorVariant) private readonly productColorRepository: Repository<ProductColorVariant>,
    @InjectRepository(OrderEntity) private readonly ordersRepository: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity) private readonly orderItemsRepository: Repository<OrderItemEntity>,
    private configService: ConfigService
  ) { }

  public async create(orderData: OrderDto): Promise<any> {
    try {
      const { user_id, items, total_price, status, created_at, firstname, lastname, phone, email, country, town, zipCode, street_address, appartment, message } = orderData;
      let user: UserEntity | null = null;
      if (user_id) {
        user = await this.usersRepository.findOne({ where: { id: user_id } });
        await this.usersRepository.update(user.id, {
          country,
          town,
          zipCode,
          street_address,
          appartment,
          message,
        });
      }

      // Create OrderEntity instance
      const order = this.ordersRepository.create({
        user, // we assign the full entity, not just the ID
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
          const variant = await this.productColorRepository.findOne({ where: { id: item.variantId }, relations: ['product'] });
          if (!product) {
            throw new Error(`Product with ID ${item.product_id} not found`);
          }
          if (!variant) {
            throw new Error(`Product with this color and with ID ${item.variantId} not found`);
          }
          if (item.quantity > variant.stock) {
            throw new Error(`Not enough stock.`);
          }
          variant.stock -= item.quantity;
          await this.productColorRepository.save(variant);
          return this.orderItemsRepository.create({
            order: savedOrder,
            variant,
            color: item.color,
            color_image: item.color_image,
            main_image: item.main_image,
            price: item.price,
            quantity: item.quantity,
          });

        })
      );

      const userLocation = {
        phone,
        email,
        firstname,
        lastname,
        country,
        town,
        zipCode,
        street_address,
        appartment,
        message,
      }

      // Save all order items
      const orderItem = await this.orderItemsRepository.save(orderItems);
      await this.sendOrderWithEmail(savedOrder, orderItem, userLocation);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Success! We’ve received your order and it’s being prepared.',
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

  public async findOne(id: number): Promise<OrderByIdResposne> {

    try {
      const result = await this.ordersRepository.findOne({
        where: { id }, relations: {
          user: true,
          orderItems: {
            variant: {
              product: {
                category: true
              }
            }
          }
        }
      });
      if (!result) {
        throw new ServiceHandler("This order was not found", HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: 200,
        message: "Order By Id",
        data: result
      };
    } catch (error) {
      throw new ServiceHandler(error.message, error.status);
    }
  }

  public async findAll(): Promise<OrderEntity[]> {
    return this.ordersRepository.find({ relations: ['orderItems'] });
  }

  public async sendOrderWithEmail(order: OrderEntity, items: OrderItemEntity[], userAddress: any): Promise<any> {

    const printer = new PdfPrinter({
      Roboto: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
      }
    })

    const transporter = nodemailer.createTransport({
      service: this.configService.get<string>('EMAIL_SERVICE'),
      host: this.configService.get<string>('EMAIL_HOST'),
      port: parseInt(this.configService.get<string>('EMAIL_PORT')),
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });

    const itemTableBody = [
      ['Product', 'Quantity', 'Unit Price', 'Price'], // header
      ...items.map(item => [
        `${item.variant.product.title} (${item.color})`,
        item.quantity.toString(),
        `£${item.price.toFixed(2)}`,
        `£${(item.quantity * item.price).toFixed(2)}`
      ])
    ];

    const vat = order.total_price * 0.2;
    const total = order.total_price + vat;


    const docDefinition: TDocumentDefinitions = {
      content: [
        { text: 'Quote Summary', style: 'header' },
        {
          columns: [
            {
              width: '33%',
              text: [
                { text: `Customer Name:${userAddress.firstname} ${userAddress.lastname}\n`, bold: true },
                { text: `Customer Email: ${userAddress.email}\n` },
                { text: `Customer Phone: ${userAddress.phone}\n` },
              ]
            },
            {
              width: '33%',
              text: [
                { text: 'Delivery Address:\n', bold: true },
                { text: `Country: ${userAddress.country}\n` },
                { text: `Town: ${userAddress.town}\n` },
                { text: `Zipcode: ${userAddress.zipCode}\n` },
                { text: `Street: ${userAddress.street_address}\n` },
                { text: `Unit: ${userAddress.appartment}\n` }
              ]
            },
            {
              width: '33%',
              text: [
                { text: 'Date:\n', bold: true },
                { text: new Date(order.created_at).toLocaleDateString() }
              ]
            }
          ]
        },
        { text: '\nOrder Summary', style: 'subheader' },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: itemTableBody,
          },
          layout: 'lightHorizontalLines'
        },
        { text: `\nTotal Net: £${order.total_price.toFixed(2)}`, margin: [10, 0, 10, 0] },
        { text: `Total VAT(20 %): £${vat.toFixed(2)}`, margin: [10, 0, 10, 0] },
        { text: `Total Amount: £${total.toFixed(2)}`, bold: true, margin: [10, 0, 10, 0] },
        {
          text: '\nIf you have any questions, feel free to contact us.\n\nBest regards,\nLondon Glass Fittings',
          style: 'footer'
        }
      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
        subheader: { fontSize: 15, bold: true, margin: [0, 10, 0, 5] },
        footer: { fontSize: 10, margin: [0, 20, 0, 0] }
      }
    };

    const chunks: any[] = [];
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.on('data', chunk => chunks.push(chunk));

    pdfDoc.on('end', async () => {
      const pdfBuffer = Buffer.concat(chunks);

      await transporter.sendMail({
        from: this.configService.get<string>('EMAIL_USER'),
        to: this.configService.get<string>('EMAIL_USER'),
        subject: 'New Order',
        html: '<p>Thank you for your order! Please find the receipt attached as a PDF.</p>',
        attachments: [
          {
            filename: `order - ${order.id}.pdf`,
            content: pdfBuffer,
            contentType: 'application/pdf'
          }
        ]
      });
    });

    pdfDoc.end();

  }
}