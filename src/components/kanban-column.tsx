import { useEffect, useRef } from 'react'
import type { TaskColumnEnum } from '../services/types'
import { useTasksInfiniteQuery } from '../services/queries'
import { TaskCard } from './task-card'

interface KanbanColumnProps {
    title: string
    columnId: TaskColumnEnum
    showBorder?: boolean
}

export function KanbanColumn(props: KanbanColumnProps) {
    const { title, columnId, showBorder = false } = props

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useTasksInfiniteQuery(columnId)
    const loadMoreRef = useRef<HTMLLIElement>(null)

    const tasks = data?.pages.flat() ?? []

    useEffect(() => {
        if (!loadMoreRef.current || !hasNextPage) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage()
                }
            },
            { threshold: 0.1 }
        )

        observer.observe(loadMoreRef.current)

        return () => observer.disconnect()
    }, [hasNextPage, isFetchingNextPage, fetchNextPage])

    return (
        <div className="h-100 d-flex flex-column">
            <h5 className={`p-3 fw-bold ${showBorder ? 'border-end' : ''}`}>{title}</h5>
            <div className={`flex-grow-1 ${showBorder ? 'border-end' : ''}`} style={{ minHeight: 0 }}>
                {tasks.length === 0 ? (
                    <p className="text-muted text-center small p-3">No tasks</p>
                ) : (
                    <ul
                        className="h-100 mb-0 px-3 pb-3 list-unstyled d-flex flex-column gap-2 overflow-auto hide-scrollbar"
                        style={{ minHeight: 0 }}
                    >
                        {tasks.map((task) => (
                            <li key={task.id}>
                                <TaskCard task={task} />
                            </li>
                        ))}
                        {hasNextPage && (
                            <li ref={loadMoreRef} className="text-center py-2">
                                {isFetchingNextPage && <span className="text-muted small">Loading...</span>}
                            </li>
                        )}
                    </ul>
                )}
            </div>
        </div>
    )
}
