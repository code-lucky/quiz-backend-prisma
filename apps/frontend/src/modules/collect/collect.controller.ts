import { Controller, Get, Inject, Query, Req } from '@nestjs/common';
import { CollectService } from './collect.service';
import { JwtService } from '@nestjs/jwt';

@Controller('collect')
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
  async getCollectList(@Req() req: Request, @Query('page') page: number, @Query('limit') limit: number) {
    const token = req.headers['authorization']?.split(' ')[1]
    const user = this.jwtService.verify(token)
    return this.collectService.getCollectList(+user.id, +page, +limit)
  }

  /**
   * 修改收藏
   * @param req 请求
   * @param palette_id 画板id
   * @returns 修改结果
   */
  @Get('/change')
  async changeCollect(@Req() req: Request, @Query('palette_id') palette_id: number) {
    const token = req.headers['authorization']?.split(' ')[1]
    const user = this.jwtService.verify(token)
    return this.collectService.changeCollect(+user.id, +palette_id)
  }
}
