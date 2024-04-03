import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT: number = 3000;

  // enable the corses which can access to this backend
  app.enableCors({
    origin: [
      'http://localhost:5173',
    ]
  })

  // allows PIPEs handle the validation of DTOs and other used structures
  // and throw the error of being incorrect body and... which are base on DTOs or any types we've
  // defined in our code
  app.useGlobalPipes(new ValidationPipe({
    stopAtFirstError: true,
    whitelist: true // it will remove any incoming fields inside the request
    // which we have not writen in our DTOs
  }));
  
  await app.listen(PORT);
}
bootstrap();
