import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RequireLogin } from '@app/common';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  // user login
  @Post('login')
  async login(@Body() body: CreateUserDto) {
    return await this.userService.login(body);
  }

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  /**
   * get user info
   * @param req 
   * @returns 
   */
  @Get('info')
  @RequireLogin()
  async findUser(@Req() req: Request) {
    console.log(req.user);
    return this.userService.findUser(req.user.userId);
  }


  // 获取用户列表
  @Get('list')
  @RequireLogin()
  async getUserList(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return await this.userService.getUserList(page, limit);
  }

  /**
   * 给用户分配角色
   * @param userId 
   * @param roleId 
   * @returns 
   */
  @Post('assignRole')
  @RequireLogin()
  async assignRole(@Body() body: { userId: number, roleId: number }) {
    return await this.userService.assignRole(body.userId, body.roleId);
  }
}
