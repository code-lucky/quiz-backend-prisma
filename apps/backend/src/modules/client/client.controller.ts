import { Controller, Get } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  /**
   * 获取客户端列表
   * @returns 客户端列表
   */
  @Get('list')
  async getClientList() {
    return await this.clientService.getClientList();
  }
}
