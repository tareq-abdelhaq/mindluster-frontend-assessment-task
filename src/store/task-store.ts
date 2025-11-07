import { create } from 'zustand'
import type { Task } from '../services/types'

interface TaskStore {
    isModalOpen: boolean
    editingTask: Task | null
    modalMode: 'add' | 'edit'
    openAddModal: () => void
    openEditModal: (task: Task) => void
    closeModal: () => void
}

export const useTaskStore = create<TaskStore>((set) => ({
    isModalOpen: false,
    editingTask: null,
    modalMode: 'add',
    openAddModal: () => set({ isModalOpen: true, editingTask: null, modalMode: 'add' }),
    openEditModal: (task: Task) => set({ isModalOpen: true, editingTask: task, modalMode: 'edit' }),
    closeModal: () => set({ isModalOpen: false, editingTask: null }),
}))
