import { Module } from '@nestjs/common';
import { ColourService } from './colour.service';
import { ColourController } from './colour.controller';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [ColourController],
  providers: [ColourService],
})
export class ColourModule {}
