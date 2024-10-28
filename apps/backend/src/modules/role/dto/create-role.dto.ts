// apps/backend/src/role/dto/create-role.dto.ts
import { IsNotEmpty, IsOptional, IsString, IsBoolean, IsArray } from 'class-validator';
import { AssignMenuDto } from './assign-menu.dto';
import { Transform, Type } from 'class-transformer';

export class CreateRoleDto {
    @IsNotEmpty({ message: '角色名称不能为空' })
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsBoolean()
    deleted?: boolean;
    
    @IsOptional()
    @IsArray()
    permissions?: AssignMenuDto[];
}