import { PrismaService } from '@app/prisma';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AssignMenuDto } from './dto/assign-menu.dto';

@Injectable()
export class RoleService {

    @Inject(PrismaService)
    private prisma: PrismaService;

    constructor() { }

    /**
     * 创建角色
     * @param createRoleDto 
     * @returns 
     */
    async create(createRoleDto: CreateRoleDto) {
        // 判断角色是否存在
        const findRole = await this.prisma.role.findUnique({
            where: { name: createRoleDto.name }
        });
        if (findRole) {
            throw new HttpException('该角色已存在', HttpStatus.BAD_REQUEST);
        }
        return await this.prisma.role.create({
            data: createRoleDto
        });
    }


    // 创建并分配菜单
    async createAndAssignMenu(createRoleDto: CreateRoleDto) {
        await this.prisma.$transaction(async (prisma) => {
            // 创建角色
            await this.create(createRoleDto);
            // 分配菜单
            await this.assignMenu(createRoleDto.permissions);
        })
        return { success: true };
    }

    // 更新并分配菜单
    async updateAndAssignMenu(updateRoleDto: UpdateRoleDto) {
        console.log('updateRoleDto', updateRoleDto);
        await this.prisma.$transaction(async (prisma) => {
            // 更新角色
            await this.update(updateRoleDto);
            // 分配菜单
            await this.assignMenu(updateRoleDto.permissions);
        })
    }
    /**
     * 查询角色列表
     * @param page 页码
     * @param limit 每页数量
     * @returns 
     */
    async getList(page: number, limit: number) {
        const total = await this.prisma.role.count();

        const list = await this.prisma.role.findMany({
            take: limit,
            skip: (page - 1) * limit,
            where: { deleted: false },
            include: {
                permission: true
            }
        });
        return { page, limit, total, list };
    }

    async findAll() {
        return await this.prisma.role.findMany();
    }

    /**
     * 查询角色
     * @param id 角色ID
     * @returns 
     */
    async findOne(id: number) {
        const role = await this.prisma.role.findUnique({
            where: { id, deleted: false },
            include: {
                permission: true
            }
        });
        if (!role) {
            throw new HttpException('角色不存在', HttpStatus.BAD_REQUEST);
        }
        return role;
    }

    /**
     * 更新角色
     * @param updateRoleDto 
     * @returns 
     */
    async update(updateRoleDto: UpdateRoleDto) {
        const findRole = await this.prisma.role.findUnique({
            where: { id: updateRoleDto.id, deleted: false }
        });
        if (!findRole) {
            throw new HttpException('角色不存在', HttpStatus.BAD_REQUEST);
        }
        // Exclude 'id' from updateRoleDto when updating
        const { id, name, description } = updateRoleDto;
        return await this.prisma.role.update({
            where: { id},
            data: {
                name,
                description
            }
        });
    }

    /**
     * 删除角色
     * @param id 角色ID
     * @returns 
     */
    async remove(id: number) {
        const findRole = await this.prisma.role.findUnique({
            where: { id, deleted: false }
        });
        if (!findRole) {
            throw new HttpException('角色不存在', HttpStatus.BAD_REQUEST);
        }
        return await this.prisma.role.delete({
            where: { id }
        });
    }


    /**
     * 给角色分配菜单
     * @param assignMenuDto 
     */
    async assignMenu(assignMenuDto: AssignMenuDto[]) {
        // 报错执行数据回滚
        await this.prisma.$transaction(async (prisma) => {
            // 判断所有的角色id是否相同，如果不想同，则抛出异常
            const roleIds = assignMenuDto.map((item) => item.role_id);
            const uniqueRoleIds = new Set(roleIds);
            if (uniqueRoleIds.size !== 1) {
                throw new HttpException('数据格式错误', HttpStatus.BAD_REQUEST);
            }

            // 判断是否存在该角色
            const findRole = await prisma.role.findUnique({
                where: {
                    id: roleIds[0],
                    deleted: false
                }
            });
            if (!findRole) {
                throw new HttpException('角色不存在', HttpStatus.BAD_REQUEST);
            }

            // 不能存在重复的菜单
            const menuIds = assignMenuDto.map((item) => item.menu_id);
            const uniqueMenuIds = new Set(menuIds);
            if (uniqueMenuIds.size !== assignMenuDto.length) {
                throw new HttpException('数据格式错误', HttpStatus.BAD_REQUEST);
            }

            // 判断菜单是否存在，如果不存在，则抛出异常，可能有多个菜单不存在
            const findMenus = await prisma.menu.findMany({
                where: {
                    id: {
                        in: assignMenuDto.map((item) => item.menu_id)
                    },
                    deleted: false
                }
            });
            if (findMenus.length !== assignMenuDto.length) {
                throw new HttpException('菜单不存在', HttpStatus.BAD_REQUEST);
            }
            // 先删除该角色下的所有菜单
            await prisma.permission.deleteMany({
                where: {
                    role_id: assignMenuDto[0].role_id
                }
            });
            // 再创建新的菜单
            await prisma.permission.createMany({
                data: assignMenuDto.map(item => ({
                    role_id: item.role_id,
                    menu_id: item.menu_id
                }))
            });

            return true;
        });
    }
}
