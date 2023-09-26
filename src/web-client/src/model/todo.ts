import { Task } from ".";

export interface Todo {
    id: number;
    name: string;
    tasks: Array<Task> | undefined
}