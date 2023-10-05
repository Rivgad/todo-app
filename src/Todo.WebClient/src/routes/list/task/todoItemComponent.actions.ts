import { ActionFunctionArgs, json } from 'react-router-dom';
import { todoService } from '../../../services/todoService';
import { TodoItemStatus } from '../../../model';
import { UUID } from 'crypto';


export const createTodoItemAction = async ({ request, params }: ActionFunctionArgs) => {
    const todoId = params.id as UUID | undefined;
    if (!todoId) throw json(
        { message: "Неверный ID списка" },
        { status: 400 }
    );
    const data = await request.formData();
    const name = data.get("name") as string | null;

    try {
        if (name) {
            return await todoService.addTodoItem(todoId, name);
        }
    } catch (ex) {
        return {
            error: "Произошла ошибка. Попробуйте снова"
        };
    }

    return null;
}

export const updateTodoItemAction = async ({ request, params }: ActionFunctionArgs) => {
    const todoItemId = params.todoItemId as UUID | null;
    if (!todoItemId) throw json(
        { message: "Неверный ID задачи" },
        { status: 400 } 
    );

    try {
        const data = await request.formData();
        const name = data.get("name") as string | null ?? "";
        const status = data.get("status") as keyof typeof TodoItemStatus | null ?? "Unfinished";

        if (todoItemId) {
            return await todoService.updateTodoItem(todoItemId, {
                name: name,
                status: status 
            });
        }
    } catch (ex) {
        return {
            error: "Произошла ошибка. Попробуйте снова",
            exception: ex
        };
    }

    return null;
}

export const deleteTodoItemAction = async ({ params }: ActionFunctionArgs) => {
    const todoItemId = params.todoItemId as UUID | null;
    if (!todoItemId) throw json(
        { message: "Неверный ID задачи" },
        { status: 400 } 
    );

    try {
        if (todoItemId) {
            await todoService.deleteTodoItem(todoItemId);
        }
    } catch (ex) {
        return {
            error: "Произошла ошибка. Попробуйте снова",
            exception: ex
        };
    }

    return null;
}
