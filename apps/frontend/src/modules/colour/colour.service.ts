import { Injectable } from '@nestjs/common';
import { resolve } from 'path';

@Injectable()
export class ColourService {
  
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

}
