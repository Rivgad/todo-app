export interface TodoItem {
    id: number;
    name: string;
    status?: keyof typeof TodoItemStatus;
}

export enum TodoItemStatus {
    Unfinished = 0,
    Finished = 1,
}
