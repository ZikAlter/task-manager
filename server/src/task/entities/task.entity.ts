import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../user/entities/user.entity";

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn({name: 'id_task'})
    id: number

    @Column({name: 'title_task', type: 'varchar'})
    titleTask: string

    @Column({name: 'fid_importance', type: 'varchar'})
    importance: string

    @ManyToOne(() => User, (user) => user.categories)
    @JoinColumn({name: 'fid_user'})
    user: User

    @CreateDateColumn({name: 'date_create_task'})
    createdAt: Date

    @Column({name: 'descript_task', type: 'varchar'})
    descript: string
}
