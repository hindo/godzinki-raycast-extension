import { LocalStorage } from "@raycast/api"
import { format } from "date-fns"
import { nanoid } from "nanoid"
import { create } from "zustand"
import { createJSONStorage, persist, StateStorage } from "zustand/middleware"

const raycastStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await LocalStorage.getItem(name))?.toString() || null
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await LocalStorage.setItem(name, value)
  },
  removeItem: async (name: string): Promise<void> => {
    await LocalStorage.removeItem(name)
  },
}

export type Task = {
  id: string
  key: string | null
  summary: string
  timeEntry: string
  description: string | null
  createdAt: string
}

export type DayEntry = {
  id: string
  title: string
  day: string
  timeSummary: number
}

type TaskStore = {
  tasks: Task[]
  addTask: (newTask: Omit<Task, "id">) => void
  updateTask: (updatedTask: Task) => void
  fixTasks: () => void
}

export const useStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (newTask) => set((state) => ({ tasks: [...state.tasks, { ...newTask, id: nanoid() }] })),
      updateTask: (updatedTask) => set((state) => ({ tasks: [...state.tasks.filter(task => task.id !== updatedTask.id), updatedTask] })),
      fixTasks: () => set((state) => ({ tasks: fixFloatingPointsInStore(state.tasks) })),
    }),
    {
      name: "godziny",
      storage: createJSONStorage(() => raycastStorage),
    }
  )
)

export const dayItemSelector = (state: TaskStore) => {
  const dE = state.tasks
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .reduce((acc: Record<string, number>, item) => {
      if (acc[item.createdAt]) {
        acc[item.createdAt] += parseFloat(item.timeEntry)
      } else {
        acc[item.createdAt] = parseFloat(item.timeEntry)
      }
      return acc
    }, {})

  return Object.entries(dE).map(([day, timeSummary]: [string, number]) => {
    return {
      id: nanoid(),
      title: format(new Date(day), "PPPP"),
      day,
      timeSummary,
    }
  })
}

// local

const fixFloatingPointsInStore = (tasks: Task[]) => {
  return tasks.map((task) => ({
    ...task,
    timeEntry: task.timeEntry.replace(",", "."),
  }))
}
