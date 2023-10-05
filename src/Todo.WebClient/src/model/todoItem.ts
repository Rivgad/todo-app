import { UUID } from "crypto";

export interface TodoItem {
    id: UUID;
    name: string;
    status?: keyof typeof TodoItemStatus;
}

export enum TodoItemStatus {
    Unfinished = 0,
    Finished = 1,
}
