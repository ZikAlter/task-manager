import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTaskDto} from './dto/create-task.dto';
import {UpdateTaskDto} from './dto/update-task.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Task} from "./entities/task.entity";
import {E_Result} from './types';
import {User} from '../user/entities/user.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {
    }

    async create(createTaskDto: CreateTaskDto) {
        const user = await this.userRepository.findOne({ where: { id: createTaskDto.user } });
        const contractor = await this.userRepository.findOne({ where: { id: createTaskDto.contractor } });

        if (!user || !contractor) {
            throw new NotFoundException('User or contractor not found');
        }

        const task = this.taskRepository.create({
            titleTask: createTaskDto.titleTask,
            importance: createTaskDto.importance,
            user: user,
            endedAt: createTaskDto.endedAt,
            contractor: contractor,
            descript: createTaskDto.descript,
            result: E_Result.Default
        });
        return await this.taskRepository.save(task);
    }

    async findAll(id: number) {
        return await this.taskRepository.find({
            where: [
                { user: { id } },
                { contractor: { id } }
            ],
            relations: {
                user: true,
                contractor: true
            },
        })
    }

    async findOne(id: number) {
        const task = await this.taskRepository.findOne({
            where: {id},
            relations: {
                user: true,
                contractor: true
            }
        });
        
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        
        return task;
    }

    async update(id: number, updateTaskDto: UpdateTaskDto) {
        const task = await this.findOne(id);
        Object.assign(task, updateTaskDto);
        return await this.taskRepository.save(task);
    }

    async remove(id: number) {
        const task = await this.findOne(id);
        return await this.taskRepository.remove(task);
    }
}
