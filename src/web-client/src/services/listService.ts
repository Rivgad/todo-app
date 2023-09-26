import axios from 'axios';

export interface Todo {
    id: string;
    name: string;
}

export interface ListService {
    getLists(): Promise<Array<Todo>>;
}

class _ListService implements ListService {
    async getLists(): Promise<Array<Todo>> {
        const response = await axios.get('/api/list')
        const lists = response.data

        return lists as Array<Todo>
    }
}

export const listService = new _ListService();