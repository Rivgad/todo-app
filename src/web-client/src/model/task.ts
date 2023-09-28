export interface Task {
    id: number;
    name: string;
    done: boolean;
    status?: keyof typeof TaskStatus;
}

export enum TaskStatus {
    Unfinished = 0,
    Finished = 1,
}
