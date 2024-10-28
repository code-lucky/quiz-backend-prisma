import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import { RequireLogin } from '@app/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@RequireLogin()
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  // create role
  @Post('create')
  async create(@Body() createMenuDto: CreateMenuDto) {
    return await this.menuService.create(createMenuDto);
  }

  // Create more
  @Post('createList')
  async createList(@Body() createMenuDtoList: CreateMenuDto[]) {
    return await this.menuService.createList(createMenuDtoList);
  }

  // get role list 支持分页, 默认分页大小为10
  @Get('list')
  async getList(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return await this.menuService.getList(page, limit);
  }

  // get all menu
  @Get('all')
  async findAll() {
    return await this.menuService.findAll();
  }

  // get menu detail
  @Get('detail/:id')
  async findOne(@Param('id') id: number) {
    return await this.menuService.findOne(+id);
  }

  // update menu
  @Post('update')
  async update(@Body() updateMenuDto: UpdateMenuDto) {
    return await this.menuService.update(updateMenuDto);
  }

  // delete menu
  @Post('delete/:id')
  async remove(@Param('id') id: number) {
    return await this.menuService.remove(+id);
  }
  
  // 获取菜单树
  @Get('tree')
  async getMenuTree() {
    return await this.menuService.getMenuTree();
  }

  

  // 获取一级菜单
  @Get('firstLevel')
  async getFirstLevelMenu() {
    return await this.menuService.getFirstLevelMenu();
  }
}
