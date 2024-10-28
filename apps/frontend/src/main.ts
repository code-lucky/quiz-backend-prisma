import { NestFactory } from '@nestjs/core';
import { FrontendModule } from './frontend.module';
import { ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter, FormatDatetimeInterceptor, FormatResponseInterceptor, InvokeRecordInterceptor, UnloginFilter } from '@app/common';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(FrontendModule);

  
  // 开启跨域处理
  app.enableCors();

  // 设置全局前缀
  app.setGlobalPrefix('frontend');

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
    .setTitle('frontend')
    .setDescription('api接口文档')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      description: '基于jwt的认证'
    })
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-doc', app, document)

  await app.listen(3001);
}
bootstrap();
