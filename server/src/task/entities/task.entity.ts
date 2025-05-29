import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../user/entities/user.entity";
import {E_Importance, E_Result} from "../types";

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn({name: 'id_task'})
    id: number

    @Column({name: 'title_task', type: 'varchar'})
    titleTask: string

    @Column({name: 'fid_importance', type: 'varchar', default: E_Importance["Default"]})
    importance: E_Importance

    @ManyToOne(() => User, (user) => user.categories)
    @JoinColumn({name: 'fid_user'})
    user: User

    @CreateDateColumn({name: 'date_create_task'})
    createdAt: Date

    @CreateDateColumn({name: 'date_end_task'}) // новое поле
    endedAt: Date

    @ManyToOne(() => User, (user) => user.categories) // новое поле
    @JoinColumn({name: 'contractor'})
    contractor: User

    @Column({name: 'descript_task', type: 'varchar'})
    descript: string

    @Column({name: 'result_task', type: 'varchar', default: E_Result["Default"]}) // новое поле
    result: E_Result
}
