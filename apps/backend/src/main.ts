import { NestFactory } from '@nestjs/core';
import { BackendModule } from './backend.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import {
  UnloginFilter,
  CustomExceptionFilter,
  FormatDatetimeInterceptor,
  FormatResponseInterceptor,
  InvokeRecordInterceptor,
 } from '@app/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(BackendModule);

  // 开启跨域处理
  app.enableCors();

  // 设置全局前缀
  app.setGlobalPrefix('backend');

  // 全局启用
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new CustomExceptionFilter(), new UnloginFilter());
  app.useGlobalInterceptors(new FormatDatetimeInterceptor(), new FormatResponseInterceptor(), new InvokeRecordInterceptor())
  
  // 这里设置请求体的大小限制，例如50mb
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  // 全局使用 ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 自动移除 DTO 中未定义的属性
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('nest-cli')
    .setDescription('api接口文档')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      description: '基于jwt的认证'
    })
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-doc', app, document)

  await app.listen(3002);
}
bootstrap();
