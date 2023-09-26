import axios from 'axios';
import { Todo } from '../model';


export interface ListService {
    getList(id: number): Promise<Todo>;
    getLists(): Promise<Array<Todo>>;
    addTodo(name: string): Promise<Todo>;
    deleteTodo(id: number): Promise<void>;
}

class _ListService implements ListService {
    async getList(id: number): Promise<Todo> {
        const response = await axios.get(`/api/list/${id}`);

        return response.data as Todo;
    }

    async getLists(): Promise<Array<Todo>> {
        const response = await axios.get('/api/list');

        return response.data as Array<Todo>;
    }

    async addTodo(name: string): Promise<Todo> {
        const response = await axios.post('/api/list', { name: name });

        return response.data as Todo;
    }

    async deleteTodo(id: number): Promise<void> {
        await axios.delete(`/api/list/${id}`);
    }
}

export const listService = new _ListService();