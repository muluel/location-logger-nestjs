import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { LocationLogModule } from './location-log.module';

dotenv.config();

async function bootstrap() {
  const rmqApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    LocationLogModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.AMQP_URI ?? 'amqp://localhost:5672'],
        queue: 'log-queue',
        queueOptions: { durable: true },
      },
    },
  );

  const tcpApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    LocationLogModule,
    {
      transport: Transport.TCP,
      options: { host: '0.0.0.0', port: 3001 },
    },
  );

  await rmqApp.listen();
  await tcpApp.listen();
}

bootstrap();
