import { PrismaService } from '@app/prisma';
import { Inject, Injectable } from '@nestjs/common';
import { UpdatePalettesDto } from './dto/update-palettes.dto';
import { CreatePalettesDto } from './dto/create-palettes.dto';

@Injectable()
export class PalettesService {

    @Inject(PrismaService)
    private prisma: PrismaService;


    /**
     * 获取调色板列表
     * @returns 调色板列表
     */
    async getPalettesList() {
        return await this.prisma.palettes.findMany({
            where: { deleted: false }
        });
    }
    
    /**
     * 创建调色板
     * @param body 
     * @returns 
     */
    async createPalettes(body: CreatePalettesDto) {
        return await this.prisma.palettes.create({
            data: body
        });
    }

    /**
     * 更新调色板
     * @param body 调色板信息
     * @returns 调色板
     */
    async updatePalettes(body: UpdatePalettesDto) {
        return await this.prisma.palettes.update({
            where: { id: body.id, deleted: false },
            data: body
        });
    }

    /**
     * 删除调色板
     * @param id 调色板ID
     * @returns 调色板
     */
    async deletePalettes(id: number) {
        return await this.prisma.palettes.update({
            where: { id },
            data: { deleted: true }
        });
    }
}
