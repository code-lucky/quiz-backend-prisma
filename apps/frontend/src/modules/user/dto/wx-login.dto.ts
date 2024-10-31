import { IsNotEmpty, IsOptional } from 'class-validator'

export class WxLoginDto {
  @IsNotEmpty({ message: 'code不能为空' })
  code: string

  @IsOptional()
  nick_name: string
  
  @IsOptional()
  avatar: string
}
