import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class ClientService {


    @Inject(PrismaService)
    private prisma: PrismaService;


    /**
     * 获取客户端列表
     * @returns 客户端列表
     */
    async getClientList() {
        return await this.prisma.client.findMany();
    }

}
