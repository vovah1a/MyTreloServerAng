import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { List } from "./List";

@Entity({name: "todos"})
export class Todo {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        length: 200,
        default: "no name"
    })
    name: string;

    @Column({
        default: 0
    })
    counter: number;

    @Column({
        default: 0
    })
    performed: number;

    @OneToMany((_type) => List, (list) => list.todo)
    lists: Promise<List[]>;
}
