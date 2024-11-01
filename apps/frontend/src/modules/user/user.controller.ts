import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { WxLoginDto } from './dto/wx-login.dto';
import { Request } from 'express';
import { RequireFrontendLogin } from '@app/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post('/login')
  async login(@Body() wxLoginDto: WxLoginDto) {
    return this.userService.login(wxLoginDto.code, wxLoginDto.nick_name, wxLoginDto.avatar)
  }


  @Get('/info')
  @RequireFrontendLogin()
  async getUserInfo(@Req() req: Request) {
    return this.userService.getUserInfo(+req.client.user_id)
  }
}
