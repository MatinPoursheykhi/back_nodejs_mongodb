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

  app.useGlobalPipes(new ValidationPipe({
    stopAtFirstError: true,
    whitelist: true,
  }));
  
  await app.listen(PORT);
}
bootstrap();
