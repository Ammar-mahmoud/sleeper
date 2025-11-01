import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger))
  const port = Number(process.env.AUTH_PORT ?? 3001);
  console.log('[AUTH] Will listen on', port);
  await app.listen(port);
}
bootstrap();
