import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MS_AUTH',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1', // Local
          // host: ms-auth, // Kubernets
          port: 3100,
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class ClientsTcpModule {}
