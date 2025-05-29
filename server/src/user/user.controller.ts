import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UsePipes,
    ValidationPipe,
    UseGuards,
    Req
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    // ВАЖНО: этот маршрут должен быть ВЫШЕ @Patch(':id')
    @Patch('change-password')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    async changePassword(
        @Req() req,
        @Body() changePasswordDto: ChangePasswordDto
    ) {
        return this.userService.changePassword(
            req.user.id,
            changePasswordDto.currentPassword,
            changePasswordDto.newPassword
        );
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }
}