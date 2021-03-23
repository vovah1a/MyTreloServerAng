import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Todo } from "./Todo";

@Entity({name: "lists"})
export class List {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        length: 300
    })
    content: string; 

    @Column({
        default: false
    })
    completed: boolean;

    @ManyToOne((_type) => Todo, (todo) => todo.lists)
    todo: Promise<Todo>;
}
