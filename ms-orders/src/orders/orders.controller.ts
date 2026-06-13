import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { OrdersService } from './orders.service';
import { OrderResponseDto } from './dto/order-response.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll(): Promise<OrderResponseDto[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<OrderResponseDto> {
    return this.ordersService.findOne(id);
  }
}
