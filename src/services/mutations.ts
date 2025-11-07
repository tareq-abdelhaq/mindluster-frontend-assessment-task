import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { Task, TaskFormData } from './types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const IS_PRODUCTION = import.meta.env.VITE_ENV === 'production'

export function useCreateTaskMutation() {
    const queryClient = useQueryClient()

    return useMutation<Task, Error, TaskFormData>({
        mutationFn: async (data: TaskFormData) => {
            const response = await fetch(`${API_BASE_URL}/tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (!response.ok) throw new Error('Failed to create task')
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
        },
    })
}

export function useUpdateTaskMutation() {
    const queryClient = useQueryClient()

    return useMutation<Task, Error, { id: number; data: TaskFormData }>({
        mutationFn: async ({ id, data }) => {
            const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
                method: IS_PRODUCTION ? 'PUT' : 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (!response.ok) throw new Error('Failed to update task')
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
        },
    })
}

export function useDeleteTaskMutation() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, number>({
        mutationFn: async (id: number) => {
            const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
                method: 'DELETE',
            })
            if (!response.ok) throw new Error('Failed to delete task')
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
        },
    })
}
