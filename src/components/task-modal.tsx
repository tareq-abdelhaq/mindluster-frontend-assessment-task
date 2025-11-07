import { type FormEvent, useMemo } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

import { useTaskStore } from '../store/task-store'
import { type TaskFormData, TaskColumnEnum } from '../services/types'
import { useCreateTaskMutation, useUpdateTaskMutation } from '../services/mutations'

const TASK_COLUMN_SELECT_OPTIONS = [
    { value: TaskColumnEnum.BACKLOG, label: 'Backlog' },
    { value: TaskColumnEnum.IN_PROGRESS, label: 'In Progress' },
    { value: TaskColumnEnum.REVIEW, label: 'Review' },
    { value: TaskColumnEnum.DONE, label: 'Done' },
]

export function TaskModal() {
    const { isModalOpen, editingTask, modalMode, closeModal } = useTaskStore()

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

        if (modalMode === 'add') {
            createTask(data, {
                onSuccess: () => {
                    closeModal()
                },
            })
        } else {
            updateTask(
                { id: editingTask!.id, data },
                {
                    onSuccess: () => {
                        closeModal()
                    },
                }
            )
        }
    }

    const defaultValues = useMemo(() => {
        if (!editingTask) {
            return {
                title: '',
                description: '',
                column: TaskColumnEnum.BACKLOG,
            }
        }
        return {
            title: editingTask.title,
            description: editingTask.description,
            column: editingTask.column,
        }
    }, [editingTask])

    return (
        <Modal show={isModalOpen} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>{modalMode === 'add' ? 'Add New Task' : 'Edit Task'}</Modal.Title>
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
                        onClick={closeModal}
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
                            : modalMode === 'add'
                              ? 'Add Task'
                              : 'Save Changes'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
