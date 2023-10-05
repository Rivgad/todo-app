import { UUID } from 'crypto';
import { TodoItem, TodoItemStatus, TodoList } from '../model';
import API from './api';


export interface TodoService {
    getTodoLists(): Promise<Array<TodoList>>;
    getTodoList(id: UUID): Promise<TodoList>;
    addTodoList(name: string): Promise<TodoList>;
    deleteTodoList(id: UUID): Promise<void>;
    addTodoItem(todoListId: UUID, taskName: string): Promise<TodoItem>;
    updateTodoItem(todoItemId: UUID, request: UpdateTodoItemRequest): Promise<TodoItem>;
    deleteTodoItem(todoItemId: UUID): Promise<void>;
}

export interface UpdateTodoItemRequest {
    name:string;
    status: keyof typeof TodoItemStatus
}

class _TodoService implements TodoService {
    async getTodoLists(): Promise<Array<TodoList>> {
        const response = await API.get('/api/list');

        return response.data as Array<TodoList>;
    }

    async getTodoList(id: UUID): Promise<TodoList> {
        const response = await API.get(`/api/list/${id}`);

        const list = response.data as TodoList;

        list.tasks?.sort((item1, item2) => {
            return item1.createdAt > item2.createdAt ? 1 : -1;
        })

        return list;
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

    async updateTodoItem(todoItemId: UUID, request: UpdateTodoItemRequest): Promise<TodoItem> {
        const response = await API.put(`/api/list/items/${todoItemId}`, request);

        return response.data as TodoItem;
    }

    async deleteTodoItem(todoItemId: UUID): Promise<void> {
        await API.delete(`/api/list/items/${todoItemId}`)
    }
}

export const todoService = new _TodoService();