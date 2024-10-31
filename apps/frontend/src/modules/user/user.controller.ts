import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { WxLoginDto } from './dto/wx-login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post('/login')
  async login(@Body() wxLoginDto: WxLoginDto) {
    return this.userService.login(wxLoginDto.code, wxLoginDto.nick_name, wxLoginDto.avatar)
  }


  @Get('/info')
  async getUserInfo(@Req() req: Request) {
    const token = req.headers['authorization']?.split(' ')[1]
    console.log('token......', token)
    return this.userService.getUserInfo(token)
  }
}
