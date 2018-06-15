import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Member} from "./Member";

@Entity()
export class Group {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar')
    projectID: string

    @Column('varchar')
    name: string

    @OneToMany(type => Member, member => member.group)
    members: Member[]

}