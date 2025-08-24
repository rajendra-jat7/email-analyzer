import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  const origins = (process.env.ORIGIN || '*').split(',').map((o) => o.trim());
  app.enableCors({ origin: origins, credentials: true });

  const port = process.env.PORT ? Number(process.env.PORT) : 4000;
  await app.listen(port);
}
bootstrap();
