import {instance} from "../api/axios.api.ts";
import {ITask} from "../types/types.ts";

export const taskLoader = async () => {
    const {data} = await instance.get<ITask[]>('/tasks')
    return data
}