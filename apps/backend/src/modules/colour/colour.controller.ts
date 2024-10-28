import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ColourService } from './colour.service';
import { CreateColourDto } from './dto/create-colour.dto';
import { UpdateColourDto } from './dto/update-colour.dto';

@Controller('colour')
export class ColourController {
  constructor(private readonly colourService: ColourService) {}

  @Get('')
  getColour(){
    return this.colourService.getColour();
  }
}
