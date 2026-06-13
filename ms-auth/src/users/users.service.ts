import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      name: 'Carlos Santander',
      email: 'carlos@mail.com',
    },
    {
      id: 2,
      name: 'Ana Torres',
      email: 'ana@mail.com',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);

    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    return user;
  }
}
