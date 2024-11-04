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
    async getClientList(page: number, limit: number, name?: string, openid?: string) {
        const list = await this.prisma.client.findMany({
            where: { name: { contains: name }, openid: { contains: openid } },
            skip: (page - 1) * limit,
            take: limit
        });

        const total = await this.prisma.client.count({ where: { name: { contains: name }, openid: { contains: openid } } });

        return {
            list,
            total
        };
    }

}
