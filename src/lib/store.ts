import { LocalStorage } from "@raycast/api"
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

export const useStore = create(
  persist(
    (set) => ({
      tasks: [],
      addTask: (newTask) => set((state) => ({ tasks: [...state.tasks, { ...newTask, id: nanoid() }] })),
    }),
    {
      name: "godziny",
      storage: createJSONStorage(() => raycastStorage),
    }
  )
)

export const dayItemSelector = (state) => {
  const dE = state.tasks
    .sort((a, b) => b.createdAt - a.createdAt)
    .reduce((acc, item) => {
      if (acc[item.createdAt]) {
        acc[item.createdAt] += parseInt(item.timeEntry)
      } else {
        acc[item.createdAt] = parseInt(item.timeEntry)
      }
      return acc
    }, {})

  return Object.entries(dE).map(([day, timeSummary]: [string, number]) => ({
    id: nanoid(),
    day,
    timeSummary,
  }))
}
