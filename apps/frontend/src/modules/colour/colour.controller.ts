import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, HttpException, HttpStatus } from '@nestjs/common';
import { ColourService } from './colour.service';
import { storage } from '@app/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';


@Controller('colour')
export class ColourController {
  constructor(private readonly colourService: ColourService) {}

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
}
