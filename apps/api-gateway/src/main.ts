import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import '../../../tracing';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  await app.listen(process.env.port ?? 3002);
}
bootstrap();
