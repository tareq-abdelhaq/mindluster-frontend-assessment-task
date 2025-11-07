import { useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'

import { TaskColumnEnum } from '../services/types'
import { useTaskStore } from '../store/task-store'

import { SearchBar } from './search-bar'
import { TaskModal } from './task-modal'
import { KanbanColumn } from './kanban-column'

const COLUMNS: Array<{ id: TaskColumnEnum; title: string }> = [
    { id: TaskColumnEnum.BACKLOG, title: 'Backlog' },
    { id: TaskColumnEnum.IN_PROGRESS, title: 'In Progress' },
    { id: TaskColumnEnum.REVIEW, title: 'Review' },
    { id: TaskColumnEnum.DONE, title: 'Done' },
]

export function KanbanBoard() {
    const [searchTerm, setSearchTerm] = useState('')
    const openAddModal = useTaskStore((state) => state.openAddModal)

    return (
        <section className="bg-white rounded-3">
            <div className="border-bottom mb-4">
                <Row className="p-4">
                    <Col xs={8} md={6}>
                        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                    </Col>
                    <Col xs={4} md={6} className="d-flex justify-content-end">
                        <Button variant="primary" onClick={openAddModal}>
                            Add Task
                        </Button>
                    </Col>
                </Row>
            </div>

            <Row className="h-800 g-0">
                {COLUMNS.map((column, index) => (
                    <Col md={3} key={column.id} className="g-0 h-100">
                        <KanbanColumn
                            title={column.title}
                            columnId={column.id}
                            showBorder={index < COLUMNS.length - 1}
                        />
                    </Col>
                ))}
            </Row>

            <TaskModal />
        </section>
    )
}
