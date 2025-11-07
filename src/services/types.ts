export enum TaskColumnEnum {
    BACKLOG = 'backlog',
    IN_PROGRESS = 'in-progress',
    REVIEW = 'review',
    DONE = 'done',
}

export interface Task {
    id: number
    title: string
    description: string
    column: TaskColumnEnum
}

export interface TaskFormData {
    title: string
    description: string
    column: TaskColumnEnum
}
