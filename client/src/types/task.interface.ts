export interface ITask {
    id: number;
    titleTask: string;
    importance: string;
    user: {
        id: number;
        surname: string;
        firstName: string;
        patronymic: string;
    };
    createdAt: Date;
    endedAt: Date;
    contractor: {
        id: number;
        surname: string;
        firstName: string;
        patronymic: string;
    };
    descript: string;
    result: string;
}

export interface ICreateTask {
    titleTask: string;
    importance: string;
    user: number;
    endedAt: Date;
    contractor: number;
    descript: string;
} 