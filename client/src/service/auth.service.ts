import {IUser, IUserData} from "../types/types.ts";
import {instance} from "../api/axios.api.ts";

export const AuthService = {
    async login(userData: IUserData): Promise<IUser | undefined> {
        const {data} = await instance.post<IUser>('auth/login', userData)
        return data
    },
    async getMe(): Promise<IUser | undefined> {
        const {data} = await instance.get<IUser>('auth/profile')
        if (data) return data
    },
}