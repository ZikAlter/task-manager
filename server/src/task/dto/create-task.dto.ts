import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { E_Importance } from '../types';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    titleTask: string;

    @IsEnum(E_Importance)
    importance: E_Importance;

    @IsNumber()
    @IsNotEmpty()
    user: number;

    @IsDate()
    @IsNotEmpty()
    endedAt: Date;

    @IsNumber()
    @IsNotEmpty()
    contractor: number;

    @IsString()
    @IsNotEmpty()
    descript: string;
}
