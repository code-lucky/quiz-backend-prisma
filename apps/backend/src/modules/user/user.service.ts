import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '@app/prisma';
import { md5 } from 'utils/md5';
import { JwtService } from '@nestjs/jwt';
import { flattenToTree } from '../../utils/flattenToTree';

@Injectable()
export class UserService {

  @Inject(PrismaService)
  private prisma: PrismaService;
  
  @Inject(JwtService)
  private jwtService: JwtService;


  /**
   * User login
   * @param body 
   * @returns 
   */
  async login(body: CreateUserDto) {

    const user = await this.prisma.user.findUnique({
      where: {
        user_name: body.user_name,
        password: md5(body.password)
      }
    });

    if (!user) {
      throw new HttpException('User already exists or password error', HttpStatus.BAD_REQUEST);
    }
    delete user.password;

    // 拿到当前用户的角色
    const role = await this.prisma.role.findUnique({
      where: { id: user.role_id }
    });

    // 拿到当前角色的权限
    const permissions = await this.prisma.permission.findMany({
      where: { role_id: role.id }
    });

    // 拿到当前角色的菜单
    const menusList = await this.prisma.menu.findMany({
      where: { id: { in: permissions.map(item => item.menu_id) } }
    });

    // 扁平化
    const flatPermissions = flattenToTree(menusList, 'id', 'pid')
    
    return {
      user:{
        ...user,
        permissions: flatPermissions
      },
      token: this.jwtService.sign({
        userId: user.id,
        user_name: user.user_name
      }, {
        expiresIn: '7d'
      })
    }
  }

  /**
   * Create user
   * @param createUserDto 
   * @returns 
   */
  async create(createUserDto: CreateUserDto) {
    // if user already exists
    const count = await this.prisma.user.count({
      where: {
        user_name: createUserDto.user_name
      }
    });
    if (count === 1) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const { user_name, password } = createUserDto
    // 密码加密
    return this.prisma.user.create({
      data: {
        user_name,
        password: md5(password),
        role_id: 1
      },
    });
  }

  /**
   * Get user info
   * @param id 
   * @returns 
   */
  async findUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    });

    // 拿到当前用户的角色
    const role = await this.prisma.role.findUnique({
      where: { id: user.role_id }
    });

    // 拿到当前角色的权限
    const permissions = await this.prisma.permission.findMany({
      where: { role_id: role.id }
    });

    // 拿到当前角色的菜单
    const menusList = await this.prisma.menu.findMany({
      where: { id: { in: permissions.map(item => item.menu_id) } }
    });

    // 扁平化
    return {
      ...user,
      permissions: menusList
    }
  }

  /**
   * 给用户分配角色
   * @param userId 
   * @param roleId 
   * @returns 
   */
  async assignRole(userId: number, roleId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId, deleted: false }
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const role = await this.prisma.role.findUnique({
      where: { id: roleId, deleted: false }
    });
    if (!role) {
      throw new HttpException('Role not found', HttpStatus.BAD_REQUEST);
    }

    this.prisma.user.update({
      where: { id: userId },
      data: {
        role_id: roleId
      }
    });

    return {}
  }


  /**
   * 获取用户列表
   * @param page 
   * @param limit 
   * @returns 
   */
  async getUserList(page: number, limit: number) {
    // 获取用户列表,并且获取角色名称
    const users = await this.prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        role: true
      }
    });

    const total = await this.prisma.user.count();

    return{
      list: users,
      total,
      page,
      limit
    }
  }
}
