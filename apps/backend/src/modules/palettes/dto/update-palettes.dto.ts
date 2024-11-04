import { IsInt, IsOptional } from "class-validator";
import { CreatePalettesDto } from "./create-palettes.dto";

export class UpdatePalettesDto extends CreatePalettesDto {
    @IsOptional()
    @IsInt({ message: 'ID必须是整数' })
    id: number;
}