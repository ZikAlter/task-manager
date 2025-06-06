import {IUser} from './user.interface';

export interface ITask {
    id: number;
    titleTask: string;
    description: string;
    importance: string;
    createdAt: string;
    user: IUser;
    contractor: IUser;
    result: string;
    endedAt: string;
    descript: string;
}

export interface ICreateTask {
    titleTask: string;
    importance: string;
    user: number;
    endedAt: Date;
    contractor: number;
    descript: string;
} 