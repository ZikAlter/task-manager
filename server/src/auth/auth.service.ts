import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import {IUser} from "../user/types";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {
    }

    async validateUser(login: string, password: string, statusAccount: boolean): Promise<any> {
        const user = await this.userService.findOne(login)
        const passwordIsMatch = await bcrypt.compare(password, user.password)
        if (user && passwordIsMatch) {
            return user
        }
        throw new UnauthorizedException('Ошибка! Введен неверный пароль')
    }

    async login(user: IUser) {
        const {id, login, role, surname, firstName, patronymic, statusAccount} = user
        if (statusAccount === false) {
            throw new UnauthorizedException('Пользователь заблокирован')
        }
        let success: string = 'Токен успешно выдан'
        return {
            success,
            surname,
            firstName,
            patronymic,
            role,
            token: this.jwtService.sign({
                id: user.id,
                login: user.login,
                role: user.role,
                surname: user.surname,
                firstName: user.firstName,
                patronymic: user.patronymic,
                statusAccount: user.statusAccount
            }),
        }
    }
}
