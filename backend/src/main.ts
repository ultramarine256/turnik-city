import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connect } from "./data/db";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  await connect();
  app.setGlobalPrefix('/');
  app.enableCors();
  await app.listen(port);
}
bootstrap();
