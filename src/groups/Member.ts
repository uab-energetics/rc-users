import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Group} from "./Group";

@Entity()
export class Member {

    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar')
    userID: string

    @ManyToOne(type => Group, group => group.members )
    group: Group
}