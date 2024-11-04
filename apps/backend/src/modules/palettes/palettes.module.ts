import { Module } from '@nestjs/common';
import { PalettesService } from './palettes.service';
import { PalettesController } from './palettes.controller';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [PalettesController],
  providers: [PalettesService],
})
export class PalettesModule {}
