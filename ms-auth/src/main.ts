import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1', // Local
      // host: '0.0.0.0', // Kubernets
      port: 3100,
    },
  });

  await app.startAllMicroservices();

  await app.listen(3000); // Local
  // await app.listen(3000, '0.0.0.0'); // Kubernets
}

void bootstrap();
