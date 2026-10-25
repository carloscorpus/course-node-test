import { json, type Request, type Response } from 'express';
import { prisma } from '../../data/postgress';
import { CreatoTodoDto, UpdateTodoDto } from '../../domain/dtos';

interface ITodos {
    id: number;
    text: string;
    completeAt: Date | null;
}

export class TodosController {
    //DI
    constructor() {}

    //Metodo GET - READ

    public getTodos = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany();
        return res.json(todos);
    };

    public getTodosId = (req: Request, res: Response) => {
        const id = +req.params.id!;

        if (isNaN(id)) return res.status(400).json({ error: 'ID Argument invalid' });

        const user = prisma.todo.findUnique({
            where: {
                id,
            },
        });

        return user ? res.json(user) : res.status(404).json({ error: `ID with ${id} not found` });
    };

    // METODO POST - CREATE
    public createTodos = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreatoTodoDto.create(req.body);
        if (error) return res.status(400).json({ error: 'Text is requerided' });

        const todo = await prisma.todo.create({
            data: createTodoDto!,
        });

        return res.json(todo);
    };

    // METODO PUTH - ACTUALIZAR
    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id!;

        const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
        if (error) return res.status(400).json({ error });

        const todo = await prisma.todo.findUnique({ where: { id } });
        if (!todo) return res.status(404).json({ error: `ID with ${id} not found` });

        const todoUpdate = await prisma.todo.update({
            where: { id: id },
            data: updateTodoDto!.values,
        });
        res.json(todoUpdate);
    };

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id!;
        if (isNaN(id)) return res.status(400).json({ error: 'ID Argument invalid' });

        const todo = await prisma.todo.findUnique({ where: { id } });
        if (!todo) return res.status(404).json({ error: `ID with ${id} not found` });

        const todoDeleted = await prisma.todo.delete({ where: { id: id } });

        todoDeleted
            ? res.json({ todoDeleted })
            : res.status(404).json({ error: `ID with ${id} not found` });
        res.json({ todo, todoDeleted });
    };
}
