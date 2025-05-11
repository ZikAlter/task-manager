import {Injectable} from '@nestjs/common';
import {CreateTaskDto} from './dto/create-task.dto';
import {UpdateTaskDto} from './dto/update-task.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Task} from "./entities/task.entity";

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    ) {
    }

    create(createTaskDto: CreateTaskDto) {
        return 'This action adds a new task';
    }

    async findAll(id: number) {
        return await this.taskRepository.find({
            where: {
                user: {id},
            },
            relations: {
                user: true,
            },
            /*select: {
              user: {
                id: true,
                email: true
              }
            },*/
        })
    }

    findOne(id: number) {
        return `This action returns a #${id} task`;
    }

    update(id: number, updateTaskDto: UpdateTaskDto) {
        return `This action updates a #${id} task`;
    }

    remove(id: number) {
        return `This action removes a #${id} task`;
    }
}
