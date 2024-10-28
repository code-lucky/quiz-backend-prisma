import { IsInt, IsNotEmpty } from 'class-validator';

export class CreatePermissionDto {
    @IsNotEmpty({message: '角色ID不能为空'})
    @IsInt()
    role_id: number;

    @IsNotEmpty({message: '菜单ID不能为空'})
    @IsInt()
    menu_id: number;
}