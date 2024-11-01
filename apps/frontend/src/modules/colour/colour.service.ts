import { PrismaService } from '@app/prisma';
import { Inject, Injectable } from '@nestjs/common';
import { resolve } from 'path';

@Injectable()
export class ColourService {
  @Inject(PrismaService)
  private prisma: PrismaService;
  
  /**
   * 获取图片颜色
   * @param filename 文件名
   * @returns 
   */
  async getColour(filename:string) {
    const ColorThief = require('colorthief');
    console.log(ColorThief);
    
    const img = resolve(process.cwd(), 'uploads', filename);

    try {
      const dominant = await ColorThief.getColor(img);
      const palette = await ColorThief.getPalette(img, 5);

      return {
        url: filename,
        palette: palette,
        dominant: dominant
      };
    } catch (err) {
      console.log(err);
      return {
        url: filename,
        palette: [],
        dominant: []
      };
    }
  }

  /**
   * 获取调色板，从数据库中获取
   * @returns 
   */
  async getPalettes(page: number, limit: number) {
    const palettes = await this.prisma.palettes.findMany({
      skip: (page - 1) * limit,
      take: limit
    });

    palettes.map(item => delete item.deleted);

    const total = await this.prisma.palettes.count();

    const list = palettes.map(item => {
      return {
        ...item,
        palette: item.palette.split(',')
      }
    });

    return {
      page,
      limit,
      total,
      list
    };
  }

  /**
   * 访问画板
   * @param palette_id 画板id
   * @returns 访问结果
   */
  async visitPalette(palette_id: number) {
    return this.prisma.palettes.update({
      where: { id: palette_id },
      data: { visits: { increment: 1 } },
    })
  }
}
