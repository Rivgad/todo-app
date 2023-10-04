import { Task, Todo } from '../model';
import API from './api';


export interface TodoService {
    addTask(todoId: number, taskName: string): Promise<Task>;
    getList(id: number): Promise<Todo>;
    getLists(): Promise<Array<Todo>>;
    addTodo(name: string): Promise<Todo>;
    deleteTodo(id: number): Promise<void>;
}

class _TodoService implements TodoService {
    async getList(id: number): Promise<Todo> {
        const response = await API.get(`/api/list/${id}`);

        return response.data as Todo;
    }

    async addTask(todoId: number, taskName: string): Promise<Task> {
        const response = await API.post(`/api/list/${todoId}`, {
            name: taskName
        })

        return response.data as Task;
    }

    async updateTask(todoId: number, task: Task): Promise<Task> {
        const response = await API.put(`/api/list/${todoId}/${task.id}`, task);

        return response.data as Task;
    }

    async deleteTask(todoId: number, taskId: number): Promise<void> {
        await API.delete(`/api/list/${todoId}/${taskId}`)
    }

    async getLists(): Promise<Array<Todo>> {
        const response = await API.get('/api/list');

        return response.data as Array<Todo>;
    }

    async addTodo(name: string): Promise<Todo> {
        const response = await API.post('/api/list', { name: name });

        return response.data as Todo;
    }

    async deleteTodo(id: number): Promise<void> {
        await API.delete(`/api/list/${id}`);
    }
}

export const todoService = new _TodoService();