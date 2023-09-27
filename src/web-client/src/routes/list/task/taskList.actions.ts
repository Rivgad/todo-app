import { ActionFunctionArgs, json } from 'react-router-dom';
import { todoService } from '../../../services/todoService';


export const createTaskAction = async ({ request, params }: ActionFunctionArgs) => {
    const todoId = Number(params.id);
    if (!Number.isInteger(todoId)) throw json(
        { message: "ID списка не является числом" },
        { status: 400 }
    );
    const data = await request.formData();
    const name = data.get("name") as string | null;

    try {
        if (name) {
            return await todoService.addTask(todoId, name);
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

    const data = await request.formData();
    const taskId = Number(data.get("id"))

    if (!Number.isInteger(taskId)) throw json(
        { message: "ID задачи не является числом" },
        { status: 400 }
    );

    try {
        const name = data.get("name") as string | null;
        const status = data.get("status") === "complete";

        if (taskId) {
            return await todoService.updateTask(todoId, {
                id: taskId,
                name: name ?? "",
                done: status
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

export const deleteTaskAction = async ({ request, params }: ActionFunctionArgs) => {
    const todoId = Number(params.id);
    if (!Number.isInteger(todoId)) throw json(
        { message: "ID списка не является числом" },
        { status: 400 }
    );

    const data = await request.formData();
    const taskId = Number(data.get("id"))

    if (!Number.isInteger(taskId)) throw json(
        { message: "ID задачи не является числом" },
        { status: 400 }
    );

    try {
        if (taskId) {
            return await todoService.deleteTask(todoId, taskId);
        }
    } catch (ex) {
        return {
            error: "Произошла ошибка. Попробуйте снова",
            exception: ex
        };
    }

    return null;
}