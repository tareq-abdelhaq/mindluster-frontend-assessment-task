import { Container } from 'react-bootstrap'
import { KanbanBoard } from './components/kanban-board'

function App() {
    return (
        <main>
            <Container className="py-4">
                <KanbanBoard />
            </Container>
        </main>
    )
}

export default App
