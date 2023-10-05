import { UUID } from "crypto";
import { TodoItem } from ".";

export interface TodoList {
    id: UUID;
    name: string;
    tasks: Array<TodoItem> | undefined
}