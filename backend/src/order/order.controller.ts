import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from "./dto/order.dto";
import { OrderEntity } from './entity/order.entity';
import { Response } from 'express';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Get('all')
  public async findAll(): Promise<OrderEntity[]> {
    return await this.orderService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: number): Promise<OrderEntity> {
    return await this.orderService.findOne(id);
  }

  @Post('create')
  public async create(@Body() orderData: OrderDto): Promise<any> {
    return await this.orderService.create(orderData);
  }

  @Put('update/:id')
  public async updateStatus(@Param('id', ParseIntPipe) id: number, @Body() status: string): Promise<any> {
    return await this.orderService.updateStatus(id, status);
  }

  @Get('uploads/:path')
  public getImage(@Param() path: any, @Res() res: Response) {
    res.sendFile(path.path, { root: 'uploads' });
  }

  @Get('uploads/colors/:path')
  public getColorImages(@Param('path') path: any, @Res() res: Response) {
    res.sendFile(path, { root: 'uploads/colors' });
  }

}
