import { json, type Request, type Response } from 'express';

interface ITodos {
    id: number;
    text: string;
    completeAdt: Date | null;
}

const todos: ITodos[] = [
    { id: 1, text: 'Buy milk', completeAdt: new Date() },
    { id: 2, text: 'Buy chocolate', completeAdt: null },
    { id: 3, text: 'Buy butter', completeAdt: new Date() },
];

export class TodosController {
    //DI
    constructor() {}

    //Metodo GET - READ

    public getTodos = (req: Request, res: Response) => {
        return res.json(todos);
    };

    public getTodosId = (req: Request, res: Response) => {
        const id = +req.params.id!;

        if (isNaN(id)) return res.status(400).json({ error: 'ID Argument invalid' });

        const todo = todos.find((todo) => todo.id === id);

        return todo ? res.json(todo) : res.status(404).json({ error: `ID with ${id} not found` });
    };

    // METODO POST - CREATE
    public createTodos = (req: Request, res: Response) => {
        const { text } = req.body;

        if (!text) return res.status(400).json({ error: 'Text is requerided' });

        const newTodo: ITodos = {
            id: todos.length + 1,
            text,
            completeAdt: null,
        };
        todos.push(newTodo);

        return res.json(newTodo);
    };

    // METODO PUTH - ACTUALIZAR
    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id!;
        if (isNaN(id)) return res.status(400).json({ error: 'ID Argument invalid' });

        const todo = todos.find((todo) => todo.id === id);
        if (!todo) return res.status(404).json({ error: `ID with ${id} not found` });

        const { text, completeAdt } = req.body;

        todo.text = text || todo.text;

        completeAdt === 'null'
            ? (todo.completeAdt = null)
            : (todo.completeAdt = new Date(completeAdt || todo.completeAdt));
        res.json(todo);
    };

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id!;
        if (isNaN(id)) return res.status(400).json({ error: 'ID Argument invalid' });

        const updatedTodo = todos.find((todo) => todo.id === id);
        if (!updatedTodo) return res.status(404).json({ error: `ID with ${id} not found` });

        todos.splice(todos.indexOf(updatedTodo), 1);

        res.json(updatedTodo);
    };

    // public deleteTodo = (req: Request, res: Response) => {
    //     const id = +req.params.id!;
    //     if (isNaN(id)) return res.status(400).json({ error: 'ID Argument invalid' });

    //     const updatedTodo = todos.find((todo) => todo.id !== id);

    //     if (!updatedTodo) return res.status(404).json({ error: `ID with ${id} not found` });

    //     todos.splice(todos.indexOf(updatedTodo), 1);

    //     res.json(updatedTodo);
    // };
}
