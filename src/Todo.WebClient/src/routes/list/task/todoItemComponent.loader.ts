import { LoaderFunctionArgs, defer, json } from 'react-router-dom';
import { todoService } from '../../../services/todoService';
import { UUID } from 'crypto';


export const taskListLoader = async ({ params }: LoaderFunctionArgs) => {
    const id = params.id as UUID | undefined
    if (!id) {
        throw json(
            { message: "Не найдено" },
            { status: 404 }
        );
    }

    return defer({
        item: todoService.getTodoList(id)
    })
};
