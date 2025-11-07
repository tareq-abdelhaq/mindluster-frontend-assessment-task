import { type FormEvent, useMemo } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

import { useCreateTaskMutation, useUpdateTaskMutation } from '../services/mutations'
import { type Task, type TaskFormData, TaskColumnEnum } from '../services/types'

interface TaskModalProps {
    show: boolean
    onHide: () => void
    task?: Task | null
    mode: 'add' | 'edit'
}

const TASK_COLUMN_SELECT_OPTIONS = [
    { value: TaskColumnEnum.BACKLOG, label: 'Backlog' },
    { value: TaskColumnEnum.IN_PROGRESS, label: 'In Progress' },
    { value: TaskColumnEnum.REVIEW, label: 'Review' },
    { value: TaskColumnEnum.DONE, label: 'Done' },
]

export function TaskModal(props: TaskModalProps) {
    const { show, onHide, task, mode } = props

    const { mutate: createTask, isPending: isCreatingTaskLoading } = useCreateTaskMutation()
    const { mutate: updateTask, isPending: isUpdatingTaskLoading } = useUpdateTaskMutation()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const data: TaskFormData = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            column: formData.get('column') as TaskColumnEnum,
        }

        if (mode === 'add') {
            createTask(data, {
                onSuccess: () => {
                    onHide()
                },
            })
        } else {
            updateTask(
                { id: task!.id, data },
                {
                    onSuccess: () => {
                        onHide()
                    },
                }
            )
        }
    }

    const defaultValues = useMemo(() => {
        if (!task) {
            return {
                title: '',
                description: '',
                column: TaskColumnEnum.BACKLOG,
            }
        }
        return {
            title: task.title,
            description: task.description,
            column: task.column,
        }
    }, [task])

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{mode === 'add' ? 'Add New Task' : 'Edit Task'}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="title" defaultValue={defaultValues.title} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            defaultValue={defaultValues.description}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Column</Form.Label>
                        <Form.Select name="column" defaultValue={defaultValues.column}>
                            {TASK_COLUMN_SELECT_OPTIONS.map((col) => (
                                <option key={col.value} value={col.value}>
                                    {col.label}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={onHide}
                        disabled={isCreatingTaskLoading || isUpdatingTaskLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        size="sm"
                        type="submit"
                        disabled={isCreatingTaskLoading || isUpdatingTaskLoading}
                    >
                        {isCreatingTaskLoading || isUpdatingTaskLoading
                            ? 'Saving...'
                            : mode === 'add'
                              ? 'Add Task'
                              : 'Save Changes'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
