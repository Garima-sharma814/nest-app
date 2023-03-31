import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // using pipes globally for all requests
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // to eliminate all the unnecessary params from requests
    }),
  );
  await app.listen(3333);
}
bootstrap();
