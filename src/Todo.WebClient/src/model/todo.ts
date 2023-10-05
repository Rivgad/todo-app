import { Task } from ".";

export interface TodoList {
    id: number;
    name: string;
    tasks: Array<Task> | undefined
}