import { NestFactory } from '@nestjs/core';
import { RiderModule } from './rider.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RiderModule,
    {
      transport: Transport.RMQ,
      options: {
       urls: ['amqp://localhost:5672'],
       queue: 'rider_queue',
       queueOptions: { 
        durable: false 
       },
      }
    },
  );
  await app.listen();
}
bootstrap();
