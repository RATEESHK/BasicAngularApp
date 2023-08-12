export interface Todo {
    id: string;
    description: string;
    createdDate: Date;
    completedDate: Date;
    isCompleted: boolean;
    deletedDate: Date;
    isDeleted: boolean;
}