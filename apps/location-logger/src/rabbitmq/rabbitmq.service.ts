import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private client: ClientProxy;

  onModuleInit() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.AMQP_URI ?? 'amqp://localhost:5672'],
        queue: 'log-queue',
        queueOptions: { durable: true },
      },
    });
  }

  emit(pattern: string, data: any) {
    const res = this.client.emit(pattern, data);
    return res;
  }

  onModuleDestroy() {
    this.client.close();
  }
}
