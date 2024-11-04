import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePalettesDto {
    @IsNotEmpty({ message: '名称不能为空' })
    @IsString({ message: '名称必须是字符串' })
    name: string;

    @IsOptional()
    description?: string;

    @IsNotEmpty({ message: '颜色不能为空' })
    @IsString({ message: '颜色必须是字符串' })
    palette: string;
}
