import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('My Wallet API')
    .setDescription('')
    .setVersion('1.0')
    .addTag('User')
    .addTag('Record')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(PORT, () =>
    console.log(`Server is running on PORT ${PORT} 🚀`),
  );
}
bootstrap();
