import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty({message: '用户名不能为空'})
    @IsString()
    user_name: string;

    @IsNotEmpty({message: '密码不能为空'})
    @IsString()
    password: string;
    
}
