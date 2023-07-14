export enum E_Role {
    Default = "Пользователь",
    Supervisor = "Руководитель",
    Admin = "Администратор",
}

export interface IUser {
    id: string
    login: string
    role: string
    surname: string
    firstName: string
    patronymic: string
    statusAccount: boolean
}