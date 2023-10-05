import { TodoItem, TodoList } from '../model';
import API from './api';


export interface TodoService {
    getTodoLists(): Promise<Array<TodoList>>;
    getTodoList(id: number): Promise<TodoList>;
    addTodoList(name: string): Promise<TodoList>;
    deleteTodoList(id: number): Promise<void>;
    addTodoItem(todoId: number, taskName: string): Promise<TodoItem>;
    updateTodoItem(todoId: number, task: TodoItem): Promise<TodoItem>;
    deleteTodoItem(todoId: number, taskId: number): Promise<void>;
}

class _TodoService implements TodoService {
    async getTodoLists(): Promise<Array<TodoList>> {
        const response = await API.get('/api/list');

        return response.data as Array<TodoList>;
    }

    async getTodoList(id: number): Promise<TodoList> {
        const response = await API.get(`/api/list/${id}`);

        return response.data as TodoList;
    }

    async addTodoList(name: string): Promise<TodoList> {
        const response = await API.post('/api/list', { name: name });

        return response.data as TodoList;
    }

    async deleteTodoList(id: number): Promise<void> {
        await API.delete(`/api/list/${id}`);
    }

    async addTodoItem(todoId: number, taskName: string): Promise<TodoItem> {
        const response = await API.post(`/api/list/${todoId}`, {
            name: taskName
        })

        return response.data as TodoItem;
    }

    async updateTodoItem(todoId: number, task: TodoItem): Promise<TodoItem> {
        const response = await API.put(`/api/list/${todoId}/${task.id}`, task);

        return response.data as TodoItem;
    }

    async deleteTodoItem(todoId: number, taskId: number): Promise<void> {
        await API.delete(`/api/list/${todoId}/${taskId}`)
    }
}

export const todoService = new _TodoService();