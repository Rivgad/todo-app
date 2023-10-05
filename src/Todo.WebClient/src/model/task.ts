export interface TodoItem {
    id: number;
    name: string;
    status?: keyof typeof TaskStatus;
}

export enum TaskStatus {
    Unfinished = 0,
    Finished = 1,
}
