import { LocalStorage } from "@raycast/api"
import { format } from "date-fns"
import { nanoid } from "nanoid"

export type DayEntry = Record<string, number>

export type TaskEntry = {
  id: string
  key: string | null
  summary: string
}

export type NewEntry = Omit<Entry, "id">

let store: Entry[] = []

export const setStore = (localStorageStore) => {
  console.log(localStorageStore)

  store = JSON.parse(localStorageStore).map((item) => ({
    ...item,
    timeEntry: parseInt(item.timeEntry),
    createdAt: new Date(item.createdAt),
  }))
}

export const groupByDay = () => {
  const dE = store
    .sort((a, b) => b.createdAt.getDate() - a.createdAt.getDate())
    .reduce((acc: DayEntry, item: Entry) => {
      const date = format(item.createdAt, "yyyy-MM-dd")
      if (acc[date]) {
        acc[date] += item.timeEntry
      } else {
        acc[date] = item.timeEntry
      }
      return acc
    }, {})

  return Object.entries(dE).map(([day, timeSummary]: [string, number]) => ({
    id: nanoid(),
    day,
    timeSummary,
  }))
}

export const getTasks = () => {
  const tasks = store
    .map((item) => ({
      id: nanoid(),
      key: item.key,
      summary: item.summary,
    }))
    .reduce((acc, item) => {
      const uid = item.key + item.summary
      acc[uid] = item
      return acc
    }, {})

  return Object.values(tasks)
}

export const addToStore = async (values: NewEntry) => {
  store = [...store, { id: nanoid(), ...values }]
  await LocalStorage.setItem("godziny", JSON.stringify(store))
}
