import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {genSalt, hash} from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: {
        login: createUserDto.login
      },
    })
    if (existUser) throw new BadRequestException('Учетная запись пользователя существует!')

    const salt = await genSalt(6)
    const hashedPassword = await hash(createUserDto.password, salt)

    const newUser = await this.userRepository.save({
      login: createUserDto.login,
      password: hashedPassword,
      role: createUserDto.role,
      surname: createUserDto.surname,
      firstName: createUserDto.firstName,
      patronymic: createUserDto.patronymic,
      statusAccount: createUserDto.statusAccount,
    })
    return {newUser};
  }

  async findOne(login: string) {
    //return await this.userRepository.findOne({where: {login}})
    const user = await this.userRepository.findOne({where: {login}})
    if (user) {
      return user
    } else {
      throw new BadRequestException('Ошибка! Введен несуществующий логин')
    }
  }

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
