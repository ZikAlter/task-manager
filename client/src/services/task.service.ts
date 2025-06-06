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

    async updateStatus(id: number, result: string): Promise<void> {
        const token = AuthService.getToken();
        if (!token) {
            throw new Error('JWT токен не найден. Авторизуйтесь.');
        }
        try {
            await axios.patch(`${API_URL}/tasks/${id}`, { result }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error('Ошибка при обновлении статуса задачи:', error);
            throw error;
        }
    },

    async update(id: number, updateData: any): Promise<ITask> {
        const token = AuthService.getToken();
        if (!token) throw new Error('JWT токен не найден. Авторизуйтесь.');
        const { data } = await axios.patch<ITask>(`${API_URL}/tasks/${id}`, updateData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return data;
    },
};
