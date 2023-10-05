import { defer } from 'react-router-dom';
import { todoService } from '../../services/todoService';


export const todoListsLoader = async () => {
    return defer({
        items: todoService.getTodoLists()
    })
};
