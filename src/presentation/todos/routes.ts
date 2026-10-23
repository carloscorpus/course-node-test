import { Router } from 'express';
import { TodosController } from './controlles.js';

export class TodoRoutes {
    static get routes(): Router {
        const router = Router();
        const todosController = new TodosController();
        // * Routes
        router.get('/', todosController.getTodos);
        router.get('/:id', todosController.getTodosId);
        router.post('/', todosController.createTodos);
        router.put('/:id', todosController.updateTodo);
        router.delete('/:id', todosController.deleteTodo);

        return router;
    }
}
