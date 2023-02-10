import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ! add npm i class-transfomer class-validator to validationPipe
  // https://github.com/typestack/class-validator
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
