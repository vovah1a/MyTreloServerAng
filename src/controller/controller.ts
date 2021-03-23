import {Request, Response} from "express";
import { Todo } from "../entity/Todo";
import { List } from "../entity/List";
import { getRepository } from "typeorm";


const todoRepository = getRepository(Todo);
const listRepository = getRepository(List);

exports.findTodo = async function (_req: Request, res: Response) {
    const todos = await todoRepository.find();
    res.send(todos)
}

exports.findList = async function (req: Request, res: Response) {
    const results = await todoRepository.findOne(req.params.id);
    if(results) {res.send(await results.lists);}
}

exports.completedList = async function (req: Request, res: Response) {
    const todo = await todoRepository.findOne(req.body.idTodo);
    if(todo) {
        listRepository.update({id: req.body.idList},{
            completed: req.body.completed
        })
        if(req.body.completed){
            todo.performed+=1;
        }
        else {
            todo.performed-=1;
        }
        await todoRepository.save(todo);
        res.send(await todo.lists);
    }
}

exports.newTodo = async function (req: Request, res: Response) {
    const todo = await todoRepository.create({
        name:req.body.name,
        counter: 0,
        performed: 0,
        lists: Promise.resolve(List)
    });
    const results = await todoRepository.save(todo);
    return res.send(results);
}

exports.newList = async function (req: Request, res: Response) {
    const todo = await todoRepository.findOne(req.body.id)
    const list = listRepository.create({
        content: req.body.content,
        completed: false,
    })
    if(todo){
        list.todo= Promise.resolve(todo);
        todo.counter +=1;
        await todoRepository.save(todo);
    }
    const results = await listRepository.save(list);
    return res.send(results);
}

exports.removedTodo = async function (req: Request, res: Response) {
    const todo = await todoRepository.findOne(req.params.id);
    if(todo){
        (await todo.lists).map((list)=> {
            listRepository.delete(list)
        })
    }
    const results = await todoRepository.delete(req.params.id);
    return res.send(results);
}

exports.removedList = async function (req: Request, res: Response) {
    const todo = await todoRepository.findOne(req.params.idTodo);
    if(todo){
        const list=(await todo.lists).filter((t) => t.id == req.params.idList)
        if(list[0].completed){
            todo.performed-=1;
        }
        todo.counter -=1;
        await todoRepository.save(todo);
        listRepository.delete(list[0]) 
    }
    return res.send(req.params.idList);
}