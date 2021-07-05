import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Necessary 'useGlobalPipes' to define that API will be able to use Pipes for validations
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));

  await app.listen(3000);
}
bootstrap();
