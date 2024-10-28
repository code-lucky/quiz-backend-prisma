import { Inject, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PrismaService } from '@app/prisma';

@Injectable()
export class PermissionService {

  @Inject(PrismaService)
  private prisma: PrismaService;

  /**
   * 创建权限
   * @param createPermissionDto 
   * @returns 
   */
  create(createPermissionDto: CreatePermissionDto[]) {
    return this.prisma.permission.createMany({
      data: createPermissionDto
    });
  }

  findAll() {
    return `This action returns all permission`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
