import { useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'

import type { Task } from '../services/types'

import { SearchBar } from './search-bar'
import { TaskModal } from './task-modal'

export function KanbanBoard() {
    const [searchTerm, setSearchTerm] = useState('')
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
    const [editingTask, setEditingTask] = useState<Task | null>(null)

    const handleAddTask = () => {
        setEditingTask(null)
        setIsTaskModalOpen(true)
    }

    return (
        <section className="bg-white p-4 rounded-3">
            <Row className="mb-4">
                <Col xs={8} md={6}>
                    <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                </Col>
                <Col xs={4} md={6} className="d-flex justify-content-end">
                    <Button variant="primary" onClick={handleAddTask}>
                        Add Task
                    </Button>
                </Col>
            </Row>

            <TaskModal
                show={isTaskModalOpen}
                onHide={() => {
                    setIsTaskModalOpen(false)
                    setEditingTask(null)
                }}
                task={editingTask}
                mode={editingTask ? 'edit' : 'add'}
            />
        </section>
    )
}
