import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const existUser = await this.userRepository.findOne({
            where: { login: createUserDto.login },
        });
        if (existUser) throw new BadRequestException('Учетная запись пользователя существует!');

        const salt = await bcrypt.genSalt(6);
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

        const newUser = await this.userRepository.save({
            login: createUserDto.login,
            password: hashedPassword,
            role: createUserDto.role,
            surname: createUserDto.surname,
            firstName: createUserDto.firstName,
            patronymic: createUserDto.patronymic,
            statusAccount: createUserDto.statusAccount,
        });

        return { newUser };
    }

    async findOne(login: string) {
        const user = await this.userRepository.findOne({where: {login}})
        if (user) {
            return user
        } else {
            throw new BadRequestException('Ошибка! Введен несуществующий логин')
        }
    }

    async findAll() {
        return await this.userRepository.find();
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            throw new BadRequestException('Пользователь не найден');
        }

        // Подготовим обновлённые данные
        let updatedFields = { ...updateUserDto };

        // Если передан новый пароль — хешируем
        if (updateUserDto.password) {
            const salt = await bcrypt.genSalt(6);
            const hashedPassword = await bcrypt.hash(updateUserDto.password, salt);
            updatedFields = { ...updatedFields, password: hashedPassword };
        }

        // Обновим пользователя
        await this.userRepository.update(id, updatedFields);

        return { message: 'Пользователь успешно обновлен' };
    }

    async changePassword(userId: number, currentPassword: string, newPassword: string) {
        // Находим пользователя
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }

        // Проверяем текущий пароль
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            throw new BadRequestException('Неверный текущий пароль');
        }

        // Проверяем, что новый пароль отличается от текущего
        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) {
            throw new BadRequestException('Новый пароль должен отличаться от текущего');
        }

        // Хешируем новый пароль
        const salt = await bcrypt.genSalt(10); // Используйте тот же salt, что и при регистрации
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        // Обновляем пароль
        await this.userRepository.update(userId, { password: hashedNewPassword });

        return { message: 'Пароль успешно изменён' };
    }



    /*async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            throw new BadRequestException('Пользователь не найден');
        }

        // Если передан новый пароль — хешируем
        if (updateUserDto.password) {
            const salt = await genSalt(6);
            updateUserDto.password = await hash(updateUserDto.password, salt);
        }

        // Обновим пользователя
        await this.userRepository.update(id, updateUserDto);
        return { message: 'Пользователь успешно обновлен' };
    }*/


    /*findAll() {
      return `This action returns all user`;
    }

    findOne(id: number) {
      return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
      return `This action updates a #${id} user`;
    }

    remove(id: number) {
      return `This action removes a #${id} user`;
    }*/
}
