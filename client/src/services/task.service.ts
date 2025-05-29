import axios from 'axios';
import {ITask} from '../types/task.interface';
import {AuthService} from "../service/auth.service.ts";

const API_URL = 'http://localhost:3000/api';

export const TaskService = {
    async getAll(): Promise<ITask[]> {
        const token = AuthService.getToken();

        if (!token) {
            throw new Error('JWT токен не найден. Авторизуйтесь.');
        }

        try {
            const {data} = await axios.get<ITask[]>(`${API_URL}/tasks`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        } catch (error) {
            console.error('Ошибка при загрузке задач:', error);
            throw error;
        }
    },

    async getOne(id: number): Promise<ITask> {
        const token = AuthService.getToken();

        if (!token) {
            throw new Error('JWT токен не найден. Авторизуйтесь.');
        }

        try {
            const {data} = await axios.get<ITask>(`${API_URL}/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        } catch (error) {
            console.error('Ошибка при загрузке задачи:', error);
            throw error;
        }
    },
};
