import { ActionFunctionArgs } from 'react-router-dom';
import { listService } from '../../services/listService';


export const todoListAction = async ({request}: ActionFunctionArgs) => {
    if (request.method == "POST"){
        const data = await request.formData();
        const name = data.get("name") as string | undefined;

        if (name)
        {
            try {
                return await listService.addTodo(name)
            }
            catch(ex) {
                return {
                    error: "Произошла ошибка. Попробуйте снова"
                }
            }
        }
    }

    return null
};
