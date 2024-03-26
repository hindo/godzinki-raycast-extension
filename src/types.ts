export type TimeEntry = {
  id: number
  czas: number
  created_at: number
}

export type TaskEntry = {
  id: number
  key: string
  summary: string
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

export type TaskStore = {
  tasks: Task[]
  addTask: (newTask: Omit<Task, "id">) => void
  updateTask: (updatedTask: Task) => void
  removeTask: (id: string) => void
  fixTasks: () => void
}

export type Preferences = {
  jiraUrl: string
  jiraUser: string
  jiraToken: string
}
