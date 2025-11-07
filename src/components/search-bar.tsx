import { Form } from 'react-bootstrap'

import { useTaskStore } from '../store/task-store'

import { SearchIcon } from './icons/search'

export function SearchBar() {
    const searchTerm = useTaskStore((state) => state.searchTerm)
    const setSearchTerm = useTaskStore((state) => state.setSearchTerm)

    return (
        <Form.Group className="position-relative">
            <Form.Control
                type="text"
                placeholder="Search by task title or description"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="ps-5"
            />
            <div className="position-absolute top-50 translate-middle-y start-0 ms-3 d-flex align-items-center text-muted pe-none">
                <SearchIcon />
            </div>
        </Form.Group>
    )
}
