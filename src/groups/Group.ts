import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Member} from "./Member";

@Entity()
export class Group {

    @PrimaryGeneratedColumn()
    id: number

    @Column('uuid')
    uuid: string

    @Column('varchar')
    name: string

    @OneToMany(type => Member, member => member.group)
    members: Member[]

}