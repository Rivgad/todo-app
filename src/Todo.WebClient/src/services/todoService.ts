import { UUID } from 'crypto';
import { TodoItem, TodoList } from '../model';
import API from './api';


export interface TodoService {
    getTodoLists(): Promise<Array<TodoList>>;
    getTodoList(id: UUID): Promise<TodoList>;
    addTodoList(name: string): Promise<TodoList>;
    deleteTodoList(id: UUID): Promise<void>;
    addTodoItem(todoListId: UUID, taskName: string): Promise<TodoItem>;
    updateTodoItem(task: TodoItem): Promise<TodoItem>;
    deleteTodoItem(todoId: number, taskId: number): Promise<void>;
}

class _TodoService implements TodoService {
    async getTodoLists(): Promise<Array<TodoList>> {
        const response = await API.get('/api/list');

        return response.data as Array<TodoList>;
    }

    async getTodoList(id: UUID): Promise<TodoList> {
        const response = await API.get(`/api/list/${id}`);

        return response.data as TodoList;
    }

    async addTodoList(name: string): Promise<TodoList> {
        const response = await API.post('/api/list', { name: name });

        return response.data as TodoList;
    }

    async deleteTodoList(id: UUID): Promise<void> {
        await API.delete(`/api/list/${id}`);
    }

    async addTodoItem(todoListId: UUID, taskName: string): Promise<TodoItem> {
        const response = await API.post(`/api/list/${todoListId}`, {
            name: taskName
        })

        return response.data as TodoItem;
    }

    async updateTodoItem(task: TodoItem): Promise<TodoItem> {
        const response = await API.put(`/api/list/items/${task.id}`, task);

        return response.data as TodoItem;
    }

    async deleteTodoItem(todoId: number, taskId: number): Promise<void> {
        await API.delete(`/api/list/${todoId}/${taskId}`)
    }
}

export const todoService = new _TodoService();