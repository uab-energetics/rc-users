import {Column, Entity, ManyToOne} from "typeorm";
import {Group} from "./Group";

@Entity()
export class Member {

    @Column('varchar')
    userID: string

    @ManyToOne(type => Group, group => group.members )
    group: Group
}