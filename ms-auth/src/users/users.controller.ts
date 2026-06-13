import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @MessagePattern({ cmd: 'get_user_by_id' })
  getUserById(@Payload() payload: { userId: number }) {
    return this.usersService.findOne(payload.userId);
  }
}
