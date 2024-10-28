import { PartialType } from '@nestjs/swagger';
import { CreatePermissionDto } from './create-permission.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
    @IsNotEmpty({message: '权限ID不能为空'})
    @IsInt()
    id: number
}
