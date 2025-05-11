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
    descript: string;
} 