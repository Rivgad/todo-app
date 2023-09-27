import { LoaderFunctionArgs, defer, json } from 'react-router-dom';
import { todoService } from '../../../services/todoService';


export const taskListLoader = async ({ params }: LoaderFunctionArgs) => {
    if (!params.id) throw json(
        { message: "ID не приведен" },
        { status: 404 }
    );

    const id = Number(params.id)
    if (!Number.isInteger(id)) {
        console.log(id);
        throw json(
            { message: "ID не является числом" },
            { status: 400 }
        );
    }

    return defer({
        item: todoService.getList(id)
    })
};
