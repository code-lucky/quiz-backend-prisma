import { Controller, Get, Query } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  /**
   * 获取客户端列表
   * @returns 客户端列表
   */
  @Get('list')
  async getClientList(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('name') name?: string, @Query('openid') openid?: string) {
    return await this.clientService.getClientList(+page, +limit, name, openid);
  }
}
