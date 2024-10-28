import { Module } from '@nestjs/common';
import { ColourService } from './colour.service';
import { ColourController } from './colour.controller';

@Module({
  controllers: [ColourController],
  providers: [ColourService],
})
export class ColourModule {}
