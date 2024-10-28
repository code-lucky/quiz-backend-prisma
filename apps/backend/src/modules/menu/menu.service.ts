import { PrismaService } from '@app/prisma';
import { Inject, Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { flattenToTree } from '../../utils/flattenToTree';

@Injectable()
export class MenuService {
  @Inject(PrismaService)
  private prisma: PrismaService;

  /**
   * 创建菜单
   * @param createMenuDto
   * @returns
   */
  async create(createMenuDto: CreateMenuDto) {
    return await this.prisma.menu.create({
      data: createMenuDto,
    });
  }

  /**
   * 获取菜单列表
   * @returns
   */
  async getList(page: number, limit: number) {
    const total = await this.prisma.menu.count();
    const list = await this.prisma.menu.findMany({
      take: limit,
      skip: (page - 1) * limit,
    });
    return { page, limit, total, list };
  }

  /**
   * 获取所有菜单
   * @returns
   */
  async findAll() {
    return await this.prisma.menu.findMany();
  }

  /**
   * 获取单个菜单
   * @param id
   * @returns
   */
  async findOne(id: number) {
    return await this.prisma.menu.findUnique({
      where: { id },
    });
  }

  /**
   * 更新菜单
   * @param id
   * @returns
   */
  async update(updateMenuDto: UpdateMenuDto) {
    return await this.prisma.menu.update({
      where: { id: updateMenuDto.id },
      data: updateMenuDto,
    });
  }

  /**
   * 删除菜单
   * @param id
   * @returns
   */
  async remove(id: number) {
    // 使用事务
    await this.prisma.$transaction(async (prisma) => {
      // 查找子菜单
      const children = await this.prisma.menu.findMany({
        where: { pid: id },
      });

      // 删除permission里的子菜单权限和自己, 要先删除权限表才能删除菜单
      await this.prisma.permission.deleteMany({
        where: {
          OR: [
            { menu_id: id },
            { menu_id: { in: children.map((child) => child.id) } },
          ],
        },
      });

      // 删除子菜单
      await this.prisma.menu.deleteMany({
        where: { pid: id },
      });

      // 删除菜单
      await this.prisma.menu.delete({
        where: { id },
      });
    });
  }

  /**
   * 获取菜单树
   * @returns
   */
  async getMenuTree() {
    const menuList = await this.prisma.menu.findMany({
      where: { deleted: false },
    });

    const menuTree = flattenToTree(menuList, 'id', 'pid');

    // 如果 menuTree 是空数组，则返回 null
    return menuTree;
  }

  /**
   * 批量创建菜单
   * @param createMenuDtoList
   * @returns
   */
  async createList(createMenuDtoList: CreateMenuDto[]) {
    return await this.prisma.menu.createMany({
      data: createMenuDtoList,
    });
  }

  /**
   * 获取一级菜单
   * @returns
   */
  async getFirstLevelMenu() {
    return await this.prisma.menu.findMany({ where: { pid: 0, deleted: false } });
  }
}
