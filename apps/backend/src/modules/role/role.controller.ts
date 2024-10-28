import { Body, Controller, Get,Param, Post, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { RequireLogin } from '@app/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AssignMenuDto } from './dto/assign-menu.dto';

@RequireLogin()
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // create role
  @Post('create')
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.create(createRoleDto);
  }

  // get role list
  @Get('list')
  async getList(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return await this.roleService.getList(page, limit);
  }

  @Get('all')
  async findAll() {
    return await this.roleService.findAll();
  }

  @Get('detail/:id')
  async findOne(@Param('id') id: number) {
    return await this.roleService.findOne(+id);
  }

  @Post('update')
  async update(@Body() updateRoleDto: UpdateRoleDto) {
    return await this.roleService.update(updateRoleDto);
  }

  @Post('delete/:id')
  async remove(@Param('id') id: number) {
    return await this.roleService.remove(+id);
  }

  // 给角色分配菜单 数组
  @Post('assignMenu')
  async assignMenu(@Body() assignMenuDto: AssignMenuDto[]) {
    return await this.roleService.assignMenu(assignMenuDto);
  }

  /**
   * 创建角色并分配菜单
   * @param body 
   * @returns 
   */
  @Post('createAndAuth')
  async createAndAssignMenu(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.createAndAssignMenu(createRoleDto);
  }

  /**
   * 更新并分配菜单
   * @param updateRoleDto 
   * @returns 
   */
  @Post('updateAndAuth')
  async updateAndAssignMenu(@Body() updateRoleDto: UpdateRoleDto) {
    return await this.roleService.updateAndAssignMenu(updateRoleDto);
  }
}
