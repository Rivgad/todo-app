import { TodoItem } from ".";

export interface TodoList {
    id: number;
    name: string;
    tasks: Array<TodoItem> | undefined
}