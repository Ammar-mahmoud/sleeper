import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  console.log('Starting Reservations Service At: ' + new Date().toISOString());
  const app = await NestFactory.create(ReservationsModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  const port = Number(process.env.RES_PORT ?? 8000);
  console.log('[RES] Will listen on', port);
  await app.listen(port);

}
bootstrap();
