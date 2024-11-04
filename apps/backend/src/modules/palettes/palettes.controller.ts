import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PalettesService } from './palettes.service';
import { CreatePalettesDto } from './dto/create-palettes.dto';
import { UpdatePalettesDto } from './dto/update-palettes.dto';

@Controller('palettes')
export class PalettesController {
  constructor(private readonly palettesService: PalettesService) {}

  /**
   * 获取调色板列表
   * @returns 调色板列表
   */
  @Get('list')
  async getPalettesList() {
    return await this.palettesService.getPalettesList();
  }

  @Post('create')
  async createPalettes(@Body() body: CreatePalettesDto) {
    return await this.palettesService.createPalettes(body);
  }


  @Post('update')
  async updatePalettes(@Body() body: UpdatePalettesDto) {
    return await this.palettesService.updatePalettes(body);
  }

  @Post('delete/:id')
  async deletePalettes(@Param('id') id: number) {
    return await this.palettesService.deletePalettes(+id);
  }
}
