import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {E_Role} from "../types";
import {Task} from "../../task/entities/task.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn({name: 'id_user'})
    id: number

    @Column({name: 'login_user', type: 'varchar'})
    login: string

    @Column({name: 'password', type: 'varchar'})
    password: string

    @Column({name: 'role', type: 'varchar', default: E_Role["Default"]})
    role: E_Role

    @Column({name: 'surname', type: 'varchar'})
    surname: string

    @Column({name: 'first_name', type: 'varchar'})
    firstName: string

    @Column({name: 'patronymic', type: 'varchar'})
    patronymic: string

    @Column({name: 'status_account', type: 'boolean', default: true})
    statusAccount: boolean

    @OneToMany(() => Task, (task) => task.user, {onDelete: 'CASCADE'})
    categories: Task[]
}
