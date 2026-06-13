import { Module } from '@nestjs/common';

import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsTcpModule } from '../common/clients/clients-tcp.module';

@Module({
  imports: [ClientsTcpModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
