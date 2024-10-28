import { Module } from '@nestjs/common';
import { BackendController } from './backend.controller';
import { BackendService } from './backend.service';
import { PrismaModule } from '@app/prisma';
import { EmailModule } from '@app/email';
import { RedisModule } from '@app/redis';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './modules/user/user.module';
import { AuthGuard } from '@app/common';
import { RoleModule } from './modules/role/role.module';
import { MenuModule } from './modules/menu/menu.module';
import { PermissionModule } from './modules/permission/permission.module';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { ColourModule } from './modules/colour/colour.module';

@Module({
  imports: [
    PrismaModule,
    EmailModule,
    RedisModule,
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
    UserModule,
    RoleModule,
    MenuModule,
    PermissionModule,
    ColourModule,
  ],
  controllers: [BackendController],
  providers: [
    BackendService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class BackendModule {}
