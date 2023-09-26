import { defer } from 'react-router-dom';
import { listService } from '../../services/listService';


export const todoListLoader = async () => {
    return defer({
        items: listService.getLists()
    })
};
