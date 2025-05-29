import { IsString, MinLength, Matches } from 'class-validator';

export class ChangePasswordDto {
    @IsString({ message: 'Текущий пароль должен быть строкой' })
    @MinLength(1, { message: 'Введите текущий пароль' })
    currentPassword: string;

    @IsString({ message: 'Новый пароль должен быть строкой' })
    @MinLength(8, { message: 'Минимум 8 символов' })
    @Matches(/[a-zA-Z]/, { message: 'Должны быть латинские буквы' })
    @Matches(/[0-9]/, { message: 'Должна быть хотя бы одна цифра' })
    @Matches(/[^a-zA-Z0-9]/, { message: 'Должен быть спец. символ' })
    newPassword: string;
}