import { useInfiniteQuery } from '@tanstack/react-query'

import { TaskColumnEnum } from './types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const TASKS_PER_PAGE = 10

export function useTasksInfiniteQuery(column: TaskColumnEnum) {
    return useInfiniteQuery({
        queryKey: ['tasks', column],
        queryFn: async ({ pageParam }) => {
            const start = (pageParam - 1) * TASKS_PER_PAGE
            const end = start + TASKS_PER_PAGE
            const params = new URLSearchParams({
                column: column,
                _start: String(start),
                _end: String(end),
            })
            const response = await fetch(`${API_BASE_URL}/tasks?${params.toString()}`)
            if (!response.ok) throw new Error('Failed to fetch tasks')
            return response.json()
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < TASKS_PER_PAGE) return undefined
            return allPages.length + 1
        },
    })
}
