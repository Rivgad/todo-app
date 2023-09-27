import { ActionFunctionArgs, json } from 'react-router-dom';
import { todoService } from '../../../services/todoService';


export const taskListAction = async ({ request, params }: ActionFunctionArgs) => {
    const todoId = Number(params.id)
    if (!Number.isInteger(todoId)) throw json(
        { message: "ID списка не является числом" },
        { status: 400 }
    );

    if (request.method == "POST") {
        const data = await request.formData();
        const name = data.get("name") as string | null;

        if (name) {
            try {
                return await todoService.addTask(todoId, name);
            }
            catch (ex) {
                return {
                    error: "Произошла ошибка. Попробуйте снова"
                };
            }
        }
    }

    return null
};
