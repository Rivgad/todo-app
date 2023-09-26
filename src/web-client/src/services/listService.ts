import axios from 'axios';


export interface Todo {
    id: number;
    name: string;
}

export interface ListService {
    getLists(): Promise<Array<Todo>>;
    addTodo(name: string): Promise<Todo>;
}

class _ListService implements ListService {
    async getLists(): Promise<Array<Todo>> {
        const response = await axios.get('/api/list');

        return response.data as Array<Todo>;
    }

    async addTodo(name: string): Promise<Todo> {
        const response = await axios.post('/api/list', { name: name });

        return response.data as Todo;
    }
}

export const listService = new _ListService();