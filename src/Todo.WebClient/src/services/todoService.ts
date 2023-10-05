import { Task, Todo } from '../model';
import API from './api';


export interface TodoService {
    getTodoLists(): Promise<Array<Todo>>;
    getTodoList(id: number): Promise<Todo>;
    addTodoList(name: string): Promise<Todo>;
    deleteTodoList(id: number): Promise<void>;
    addTask(todoId: number, taskName: string): Promise<Task>;
}

class _TodoService implements TodoService {
    async getTodoLists(): Promise<Array<Todo>> {
        const response = await API.get('/api/list');

        return response.data as Array<Todo>;
    }

    async getTodoList(id: number): Promise<Todo> {
        const response = await API.get(`/api/list/${id}`);

        return response.data as Todo;
    }

    async addTodoList(name: string): Promise<Todo> {
        const response = await API.post('/api/list', { name: name });

        return response.data as Todo;
    }

    async deleteTodoList(id: number): Promise<void> {
        await API.delete(`/api/list/${id}`);
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
}

export const todoService = new _TodoService();