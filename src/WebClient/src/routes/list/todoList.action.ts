import { ActionFunctionArgs } from 'react-router-dom';
import { todoService } from '../../services/todoService';


export const todoListAction = async ({ request }: ActionFunctionArgs) => {
    if (request.method == "POST") {
        const data = await request.formData();
        const name = data.get("name") as string | null;

        if (name) {
            try {
                return await todoService.addTodo(name);
            }
            catch (ex) {
                return {
                    error: "Произошла ошибка. Попробуйте снова"
                };
            }
        }
    } else if (request.method == "DELETE") {
        const data = await request.formData();
        const id = data.get("id") as number | null;

        if (id) {
            try {
                await todoService.deleteTodo(id);
                return null;
            }
            catch (ex) {
                return {
                    error: "Произошла ошибка. Попробуйте снова"
                }
            }
        }
    }

    return null
};