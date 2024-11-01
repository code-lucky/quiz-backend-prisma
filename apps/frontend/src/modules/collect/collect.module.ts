import { Module } from '@nestjs/common';
import { CollectService } from './collect.service';
import { CollectController } from './collect.controller';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [CollectController],
  providers: [CollectService],
})
export class CollectModule {}
