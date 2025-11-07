import { useQuery } from '@tanstack/react-query'

import type { Task } from './types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export function useTasksQuery() {
    return useQuery<Array<Task>>({
        queryKey: ['tasks'],
        queryFn: async () => {
            const response = await fetch(`${API_BASE_URL}/tasks`)
            if (!response.ok) throw new Error('Failed to fetch tasks')
            return response.json()
        },
    })
}
