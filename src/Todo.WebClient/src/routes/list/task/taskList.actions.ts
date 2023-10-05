import { ActionFunctionArgs, json } from 'react-router-dom';
import { todoService } from '../../../services/todoService';
import { TodoItemStatus } from '../../../model';
import { UUID } from 'crypto';


export const createTaskAction = async ({ request, params }: ActionFunctionArgs) => {
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

export const updateTaskAction = async ({ request, params }: ActionFunctionArgs) => {
    const todoId = Number(params.id);
    if (!Number.isInteger(todoId)) throw json(
        { message: "ID списка не является числом" },
        { status: 400 }
    );

    const taskId = Number(params.taskId);
    if (!Number.isInteger(taskId)) throw json(
        { message: "ID задачи не является числом" },
        { status: 400 } 
    );

    try {
        const data = await request.formData();
        const name = data.get("name") as string | null ?? "";
        const status = data.get("status") as keyof typeof TodoItemStatus | null ?? "Unfinished";

        if (taskId) {
            return await todoService.updateTodoItem(todoId, {
                id: taskId,
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

export const deleteTaskAction = async ({ params }: ActionFunctionArgs) => {
    const todoId = Number(params.id);
    if (!Number.isInteger(todoId)) throw json(
        { message: "ID списка не является числом" },
        { status: 400 }
    );

    const taskId = Number(params.taskId);
    if (!Number.isInteger(taskId)) throw json(
        { message: "ID задачи не является числом" },
        { status: 400 }
    );

    try {
        if (taskId) {
            await todoService.deleteTodoItem(todoId, taskId);
        }
    } catch (ex) {
        return {
            error: "Произошла ошибка. Попробуйте снова",
            exception: ex
        };
    }

    return null;
}
