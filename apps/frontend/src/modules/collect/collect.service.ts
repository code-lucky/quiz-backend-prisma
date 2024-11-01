import { PrismaService } from '@app/prisma';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CollectService {

    @Inject(PrismaService)
    private prisma: PrismaService;

    /**
     * 获取收藏列表
     * @param client_id 用户id
     * @param page 页码
     * @param limit 每页条数
     * @returns 收藏列表
     */
    async getCollectList(client_id: number, page: number, limit: number) {
        const skip = (page - 1) * limit
        const collectList = await this.prisma.palette_collect.findMany({
            where: { client_id },
            skip,
            take: limit,
        })

        const total = await this.prisma.palette_collect.count({
            where: { client_id },
        })

        // 获取收藏的palette信息
        const paletteList = await this.prisma.palettes.findMany({
            where: { id: { in: collectList.map(item => item.palette_id) } },
        })


        // 获取每个画板的收藏数量
        const collectCount = await this.prisma.palette_collect.groupBy({
            by: ['palette_id'],
            _count: {
                _all: true
            }
        })

        const list = paletteList.map(item => {
            return {
                ...item,
                palette: item.palette.split(','),
                is_collect: 1,
                collect_count: collectCount.find(collect => collect.palette_id === item.id)?._count._all || 0
            }
        })

        return {
            list: list,
            total,
            page,
            limit,
        }
    }

    /**
     * 修改收藏
     * @param client_id 用户id
     * @param palette_id 画板id
     * @returns 修改结果
     */
    async changeCollect(client_id: number, palette_id: number) {
        // 判断是否已收藏
        const collect = await this.prisma.palette_collect.findFirst({
            where: { client_id, palette_id },
        })

        if (collect) {
            // 已收藏，则取消收藏
            await this.prisma.palette_collect.delete({
                where: { id: collect.id },
            })
        } else {
            // 未收藏，则收藏
            await this.prisma.palette_collect.create({
                data: { client_id, palette_id },
            })
        }

        // 获取画板收藏数量
        const collect_count = await this.prisma.palette_collect.count({
            where: { palette_id },
        })

        return {
            collect_count
        }
    }

}
