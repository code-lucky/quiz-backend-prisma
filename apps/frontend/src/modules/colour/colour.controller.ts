import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, HttpException, HttpStatus, Query, Req, Inject } from '@nestjs/common';
import { ColourService } from './colour.service';
import { storage } from '@app/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { JwtService } from '@nestjs/jwt';


@Controller('colour')
export class ColourController {
  constructor(private readonly colourService: ColourService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

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
  async getPalettes(@Req() req: Request, @Query('page') page: number = 1, @Query('limit') limit: number = 10) {

    // 获取token
    const token = req.headers['authorization']?.split(' ')[1]

    if(token) {
      const user = this.jwtService.verify(token)
      if(user.user_id) {
        return await this.colourService.getPalettes(+user.user_id, +page, +limit);
      }else{
        return await this.colourService.getPalettes(0, +page, +limit);
      }
    }
    return await this.colourService.getPalettes(0, +page, +limit);
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
