import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { firstValueFrom } from 'rxjs';

import { UserResponseDto } from './dto/user-response.dto';
import { GetUserByIdRequestDto } from './dto/get-user-by-id-request.dto';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('MS_AUTH')
    private readonly authClient: ClientProxy,
  ) {}
  // ClientProxy.send() usa el patrón request-response y retorna un Observable.
  // Se debe convertir el Observable con firstValueFrom()

  private readonly orders = [
    {
      id: 1001,
      product: 'Laptop Lenovo',
      userId: 1,
    },
    {
      id: 1002,
      product: 'Monitor LG',
      userId: 2,
    },
    {
      id: 1003,
      product: 'Mouse Logitech',
      userId: 1,
    },
  ];

  async findAll() {
    const result = await Promise.all(
      this.orders.map(async (order) => {
        const user = await firstValueFrom(
          this.authClient.send<UserResponseDto, GetUserByIdRequestDto>(
            { cmd: 'get_user_by_id' },
            { userId: order.userId },
          ),
        );
        return {
          ...order,
          user,
        };
      }),
    );

    return result;
  }

  async findOne(id: number) {
    const order = this.orders.find((item) => item.id === id);

    if (!order) {
      throw new NotFoundException(`Order con id ${id} no encontrado`);
    }

    const user = await firstValueFrom(
      this.authClient.send<UserResponseDto, GetUserByIdRequestDto>(
        { cmd: 'get_user_by_id' },
        { userId: order.userId },
      ),
    );

    return {
      ...order,
      user,
    };
  }
}
