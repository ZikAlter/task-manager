import {IsBoolean, IsEnum, IsNotEmpty, IsString, Length} from "class-validator";
import {E_Role} from "../types";

export class CreateUserDto {
    @IsNotEmpty({message: 'Не должен быть пуст'})
    @IsString({message: 'Тип данных должен быть строковый'})
    @Length(6, 20, {message: 'Не меньше 6 и не больше 20 символов'})
    readonly login: string

    @IsNotEmpty({message: 'Не должен быть пуст'})
    @IsString({message: 'Тип данных должен быть строковый'})
    @Length(6, 20, {message: 'Не меньше 6 и не больше 20 символов'})
    readonly password: string

    @IsNotEmpty({message: 'Не должен быть пуст'})
    @IsEnum(E_Role, {message: 'Не содержит нужной роли доступа'})
    readonly role: E_Role = E_Role.Admin

    @IsNotEmpty({message: 'Не должен быть пуст'})
    @IsString({message: 'Тип данных должен быть строковый'})
    readonly surname: string

    @IsNotEmpty({message: 'Не должен быть пуст'})
    @IsString({message: 'Тип данных должен быть строковый'})
    readonly firstName: string

    @IsNotEmpty({message: 'Не должен быть пуст'})
    @IsString({message: 'Тип данных должен быть строковый'})
    readonly patronymic: string

    @IsNotEmpty({message: 'Не должен быть пуст'})
    @IsBoolean({message: 'Тип данных должен быть булевым'})
    readonly statusAccount: boolean = true
}
