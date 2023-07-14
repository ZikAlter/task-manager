import {instance} from "../api/axios.api.ts";
import {ITask} from "../types/types.ts";

export const taskLoader = async () => { // загрузить все категории с сервера
    const {data} = await instance.get<ITask[]>('/tasks')
    return data
}