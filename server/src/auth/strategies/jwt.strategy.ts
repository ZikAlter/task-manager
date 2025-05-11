import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {IUser} from "../../user/types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        })
    }

    async validate(user: IUser) {
        return {
            id: user.id,
            login: user.login,
            role: user.role,
            surname: user.surname,
            firstName: user.firstName,
            patronymic: user.patronymic,
            statusAccount: user.statusAccount
        }
    }
}