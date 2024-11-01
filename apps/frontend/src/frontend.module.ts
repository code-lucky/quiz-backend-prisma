import { Module } from '@nestjs/common';
import { FrontendController } from './frontend.controller';
import { FrontendService } from './frontend.service';
import { PrismaModule } from '@app/prisma';
import { EmailModule } from '@app/email';
import { RedisModule } from '@app/redis';
import { JwtModule } from '@nestjs/jwt';
import { FrontendAuthGuard } from '@app/common';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { ColourModule } from './modules/colour/colour.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FileModule } from './modules/file/file.module';
import { UserModule } from './modules/user/user.module';
import { CollectModule } from './modules/collect/collect.module';

@Module({
  imports: [
    PrismaModule,
    EmailModule,
    RedisModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/frontend/uploads',
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory() {
        return {
          secret: 'test',
          signOptions: {
            expiresIn: '30m' // 默认 30 分钟
          }
        }
      }
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env') // Updated to point to the root directory
    }),
    ColourModule,
    FileModule,
    UserModule,
    CollectModule,
  ],
  controllers: [FrontendController],
  providers: [
    FrontendService,
    {
      provide: 'APP_GUARD',
      useClass: FrontendAuthGuard,
    },
  ],
})
export class FrontendModule {}
