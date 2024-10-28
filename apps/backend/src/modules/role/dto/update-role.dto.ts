// extends CreateRoleDto
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateRoleDto } from "./create-role.dto";

export class UpdateRoleDto extends CreateRoleDto {
    @IsNotEmpty({ message: '角色ID不能为空' })
    @IsInt()
    id: number;
}