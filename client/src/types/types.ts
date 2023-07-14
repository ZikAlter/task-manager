export interface IUser { // то что будем записывать в store
    success: string
    surname: string
    firstName: string
    patronymic: string
    role: string
    token: string
}
export interface IUserData {
    login: string
    password: string
}

export interface ITask {
    id: number
    titleTask: string
    importance: string
    createdAt: any
    descript: string
    user: []
}