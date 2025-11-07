import { Form } from 'react-bootstrap'

import { SearchIcon } from './icons/search'

interface SearchBarProps {
    searchTerm: string
    onSearchChange: (value: string) => void
}

export function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
    return (
        <Form.Group className="position-relative">
            <Form.Control
                type="text"
                placeholder="Search by task title or description"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="ps-5"
            />
            <div className="position-absolute top-50 translate-middle-y start-0 ms-3 d-flex align-items-center text-muted pe-none">
                <SearchIcon />
            </div>
        </Form.Group>
    )
}
