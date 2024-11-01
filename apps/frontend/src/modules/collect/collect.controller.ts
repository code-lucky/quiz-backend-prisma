import { Controller, Get, HttpException, HttpStatus, Inject, ParseIntPipe, Query, Req } from '@nestjs/common';
import { CollectService } from './collect.service';
import { JwtService } from '@nestjs/jwt';
import { RequireFrontendLogin } from '@app/common';
import { Request } from 'express';

@Controller('collect')
@RequireFrontendLogin()
export class CollectController {
  constructor(private readonly collectService: CollectService) {}

  @Inject(JwtService)
  private jwtService: JwtService;


  /**
   * 获取收藏列表
   * @param req 请求
   * @param page 页码
   * @param limit 每页条数
   * @returns 收藏列表
   */
  @Get('/list')
  async getCollectList(@Req() req: Request, @Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.collectService.getCollectList(+req.client.user_id, +page, +limit)
  }

  /**
   * 修改收藏
   * @param req 请求
   * @param palette_id 画板id
   * @returns 修改结果
   */
  @Get('/change')
  async changeCollect(@Req() req: Request, @Query('palette_id') palette_id: number) {
    if(!palette_id) {
      throw new HttpException('画板id不能为空', HttpStatus.BAD_REQUEST)
    }
    return this.collectService.changeCollect(+req.client.user_id, +palette_id)
  }
}
