export enum E_Result {
    Default = "В работе",
    Successfull = "Выполнено",
    Failled = "Просрочено",
}

export enum E_Importance {
    Default = "Низкая",
    Medium = "Средняя",
    Urgently = "Срочно",
}

export interface ITask {
    id: number
    titleTask: string
    importance: string
    user: number
    createdAt: string
    endedAt: string
    contractor: number
    descript: string
    result: string
}