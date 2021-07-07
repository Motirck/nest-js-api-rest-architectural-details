import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Necessary 'useGlobalPipes' to define that API will be able to use Pipes for validations
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));

  // Container of dependency injection
  useContainer(app.select(AppModule), {fallbackOnErrors: true});

  await app.listen(3000);
}
bootstrap();
