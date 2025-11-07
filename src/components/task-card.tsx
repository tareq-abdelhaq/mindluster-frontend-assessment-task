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
    return (
        <Card className="border">
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
