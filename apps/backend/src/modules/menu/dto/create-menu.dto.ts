import { IsNotEmpty, IsOptional, IsInt, IsString, IsBoolean } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMenuDto {
    @ApiProperty({ description: '菜单名称' })
    @IsNotEmpty({message: '菜单名称不能为空'})
    @IsString()
    name: string;

    @ApiProperty({ description: '菜单标题' })
    @IsNotEmpty({message: '菜单标题不能为空'})
    @IsString()
    title: string;

    @ApiProperty({ description: '菜单路径' })
    @IsNotEmpty({message: '菜单路径不能为空'})
    @IsString()
    path: string;

    @ApiProperty({ description: '菜单图标' })
    @IsOptional()
    @IsString()
    icon?: string;

    @ApiProperty({ description: '父级菜单ID' })
    @IsOptional()
    @IsInt()
    pid?: number = 0;

    @ApiProperty({ description: '菜单类型' })
    @IsOptional()
    @IsString()
    type?: string = "page"; // Optional, defaults to 0

    @ApiProperty({ description: '菜单排序' })
    @IsInt()
    @IsOptional()
    sort?: number = 0;

    @ApiProperty({ description: '是否隐藏' })
    @IsBoolean()
    hide?: boolean = false;

    @ApiProperty({ description: '菜单外链' })
    @IsOptional()
    @IsString()
    href?: string;

    @ApiProperty({ description: '菜单组件地址' })
    @IsString()
    component?: string;
}