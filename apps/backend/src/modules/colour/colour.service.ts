import { Inject, Injectable } from '@nestjs/common';
import { CreateColourDto } from './dto/create-colour.dto';
import { UpdateColourDto } from './dto/update-colour.dto';
import { resolve } from 'path';
import { PrismaService } from '@app/prisma';

@Injectable()
export class ColourService {
  @Inject(PrismaService)
  private prisma: PrismaService;

  create(createColourDto: CreateColourDto) {
    return 'This action adds a new colour';
  }

  async getColour() {
    const ColorThief = require('colorthief');
    console.log(ColorThief);
    
    const img = resolve(process.cwd(), 'uploads', 'image-2.4461c1c0.jpg');

    try {
      const dominant = await ColorThief.getColor(img);
      const palette = await ColorThief.getPalette(img, 5);

      return {
        palette: palette,
        dominant: dominant
      };
    } catch (err) {
      console.log(err);
      return {
        palette: [],
        dominant: []
      };
    }
  }


  createPalettes(name: string, palette: string, description: string) {
    return this.prisma.palettes.create({
      data: {
        name, palette, description
      }
    })
  }
}
