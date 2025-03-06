import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS if needed
  await app.listen(3003); 


  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
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
  await microservice.listen();
}
bootstrap();
