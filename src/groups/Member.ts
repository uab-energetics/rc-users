import {Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Group} from "./Group";

@Entity()
export class Member {

    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar')
    email: string

    @ManyToOne(type => Group, group => group.members, { onDelete: "CASCADE" })
    @JoinColumn({name: 'groupID'})
    group: Group
}