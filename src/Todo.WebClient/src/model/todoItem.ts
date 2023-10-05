import { UUID } from "crypto";

export interface TodoItem {
    id: UUID;
    name: string;
    status: keyof typeof TodoItemStatus;
    createdAt: Date
}

export enum TodoItemStatus {
    Unfinished = 0,
    Finished = 1,
}
