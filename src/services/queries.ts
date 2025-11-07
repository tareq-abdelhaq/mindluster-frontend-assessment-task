import { useInfiniteQuery } from '@tanstack/react-query'

import { TaskColumnEnum } from './types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const TASKS_PER_PAGE = 10
const IS_PRODUCTION = import.meta.env.VITE_ENV === 'production'

export function useTasksInfiniteQuery(column: TaskColumnEnum) {
    return useInfiniteQuery({
        queryKey: ['tasks', column],
        queryFn: async ({ pageParam }) => {
            let url: string

            if (IS_PRODUCTION) {
                // MockAPI format: use page and limit
                const page = pageParam
                const limit = TASKS_PER_PAGE
                url = `${API_BASE_URL}/tasks?column=${column}&page=${page}&limit=${limit}`
            } else {
                // JSON Server format: use _start and _end
                const start = (pageParam - 1) * TASKS_PER_PAGE
                const end = start + TASKS_PER_PAGE
                url = `${API_BASE_URL}/tasks?column=${column}&_start=${start}&_end=${end}`
            }

            const response = await fetch(url)
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
