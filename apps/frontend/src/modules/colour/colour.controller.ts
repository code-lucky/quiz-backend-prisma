import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, HttpException, HttpStatus, Query } from '@nestjs/common';
import { ColourService } from './colour.service';
import { storage } from '@app/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';


@Controller('colour')
export class ColourController {
  constructor(private readonly colourService: ColourService) {}

  /**
   * 获取颜色
   * @param file 文件
   * @param body 请求体
   * @returns 颜色
   */
  @Post('getColour')
  @UseInterceptors(AnyFilesInterceptor({
    storage: storage
  }))
  getColour(@UploadedFiles() file: Express.Multer.File, @Body() body) {
    try{
      const filename = file[0].filename
      return this.colourService.getColour(filename);
    }catch(error){
      throw new HttpException('出现异常，请联系管理员', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * 获取画板列表
   * @param page 页码
   * @param limit 每页条数
   * @returns 画板列表
   */
  @Get('palettes')
  async getPalettes(@Query('page') page = 1, @Query('limit') limit = 10) {
    return await this.colourService.getPalettes(+page, +limit);
  }

  /**
   * 访问画板
   * @param palette_id 画板id
   * @returns 访问结果
   */
  @Get('visit')
  async visitPalette(@Query('palette_id') palette_id: number) {
    return await this.colourService.visitPalette(+palette_id);
  }
}
