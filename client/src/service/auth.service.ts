import {IUser, IUserData} from "../types/types.ts";
import {instance} from "../api/axios.api.ts";

export const AuthService = {
    async login(userData: IUserData): Promise<IUser | undefined> {
        const {data} = await instance.post<IUser>('auth/login', userData);
        if (data) {
            const {id, surname, firstName, patronymic, login, role} = data;
            localStorage.setItem('user', JSON.stringify({id, surname, firstName, patronymic, login, role}));
        }
        return data;
    },
    async getMe(): Promise<IUser | undefined> {
        const {data} = await instance.get<IUser>('auth/profile');
        if (data) {
            const {id, surname, firstName, patronymic, login, role} = data;
            localStorage.setItem('user', JSON.stringify({id, surname, firstName, patronymic, login, role}));
            return data;
        }
    },
    getToken() {
        return localStorage.getItem('token');
    },
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
}