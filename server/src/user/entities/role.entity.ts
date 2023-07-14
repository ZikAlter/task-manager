import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('role_user')
export class Role {
    @PrimaryGeneratedColumn({name: 'id_role'})
    id: number

    @Column({name: 'title_role', type: 'varchar'})
    titleRole: string
}