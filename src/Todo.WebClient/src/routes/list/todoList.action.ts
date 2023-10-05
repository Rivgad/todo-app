import { ActionFunctionArgs } from 'react-router-dom';
import { todoService } from '../../services/todoService';
import { UUID } from 'crypto';


export const todoListAction = async ({ request }: ActionFunctionArgs) => {
    if (request.method == "POST") {
        const data = await request.formData();
        const name = data.get("name") as string | null;

        if (name) {
            try {
                return await todoService.addTodoList(name);
            }
            catch (ex) {
                return {
                    error: "Произошла ошибка. Попробуйте снова"
                };
            }
        }
    } else if (request.method == "DELETE") {
        const data = await request.formData();
        const id = data.get("id") as UUID | null;

        if (id) {
            try {
                await todoService.deleteTodoList(id);
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
