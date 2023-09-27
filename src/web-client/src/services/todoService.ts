import axios from 'axios';
import { Task, Todo } from '../model';


export interface TodoService {
    addTask(todoId: number, taskName:string): Promise<Task>;
    getList(id: number): Promise<Todo>;
    getLists(): Promise<Array<Todo>>;
    addTodo(name: string): Promise<Todo>;
    deleteTodo(id: number): Promise<void>;
}

class _TodoService implements TodoService {
    async getList(id: number): Promise<Todo> {
        const response = await axios.get(`/api/list/${id}`);

        return response.data as Todo;
    }

    async addTask(todoId: number, taskName: string): Promise<Task> {
        const response = await axios.post(`/api/list/${todoId}`, {
            name: taskName
        })

        return response.data as Task
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

export const todoService = new _TodoService();