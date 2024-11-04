import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
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
  async getPalettesList(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('name') name?: string) {
    return await this.palettesService.getPalettesList(+page, +limit, name);
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
