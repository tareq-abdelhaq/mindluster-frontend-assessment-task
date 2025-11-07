import { Card, Button } from 'react-bootstrap'

import type { Task } from '../services/types'
import { useTaskStore } from '../store/task-store'
import { useDeleteTaskMutation } from '../services/mutations'

import { EditIcon } from './icons/edit'
import { DeleteIcon } from './icons/delete'

interface TaskCardProps {
    task: Task
}

export function TaskCard({ task }: TaskCardProps) {
    const openEditModal = useTaskStore((state) => state.openEditModal)
    const { mutate: deleteTask, isPending: isDeletingTaskLoading } = useDeleteTaskMutation()

    const handleEdit = () => {
        openEditModal(task)
    }

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            deleteTask(task.id)
        }
    }

    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData('task', JSON.stringify(task))
        e.dataTransfer.effectAllowed = 'move'

        const target = e.currentTarget as HTMLElement
        target.style.opacity = '0.5'
    }

    const handleDragEnd = (e: React.DragEvent) => {
        const target = e.currentTarget as HTMLElement
        target.style.opacity = '1'
    }

    return (
        <Card className="border cursor-grab" draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <Card.Body className="p-3">
                <Card.Title className="h6 mb-2 fw-bold">{task.title}</Card.Title>
                <Card.Text className="text-muted small mb-3">{task.description}</Card.Text>
                <div className="d-flex justify-content-end align-items-center gap-2">
                    <Button
                        variant="link"
                        onClick={handleEdit}
                        className="d-flex align-items-center justify-content-center p-0 text-muted"
                        size="sm"
                        aria-label="Edit task"
                        disabled={isDeletingTaskLoading}
                    >
                        <EditIcon />
                    </Button>
                    <Button
                        variant="link"
                        onClick={handleDelete}
                        className="d-flex align-items-center justify-content-center p-0 text-muted"
                        size="sm"
                        aria-label="Delete task"
                        disabled={isDeletingTaskLoading}
                    >
                        <DeleteIcon />
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}
