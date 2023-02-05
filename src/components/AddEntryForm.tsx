import { Action, ActionPanel, Form, Icon, useNavigation } from "@raycast/api"
import { AxiosError } from "axios"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { fetchJiraSummary } from "../lib/jira"
import { useStore } from "../lib/store"
import { TaskEntry } from "../types"

export const AddEntryForm = () => {
  const { pop } = useNavigation()
  const tasks = useStore((state) => state.tasks)
  const addTask = useStore((state) => state.addTask)

  const [jiraTicketId, setJiraTicketId] = useState<string>("")
  const [jiraTicketIdError, setJiraTicketIdError] = useState<string | undefined>()

  const [summary, setSummary] = useState<string>("")
  const [summaryError, setSummaryError] = useState<string | undefined>()

  const [timeEntry, setTimeEntry] = useState<string>("")
  const [timeEntryError, setTimeEntryError] = useState<string | undefined>()

  const [createdAt, setCreatedAt] = useState<Date | null>(new Date())
  const [createdAtError, setCreatedAtError] = useState<string | undefined>()

  const handleDropdownChange = (value: string) => {
    if (value === "newTask") return
    const task: TaskEntry = JSON.parse(value)

    setJiraTicketId(task.key)
    setSummary(task.summary)
  }

  const handleFetchJiraSummary = async () => {
    if (jiraTicketId) {
      try {
        const data = await fetchJiraSummary(jiraTicketId)
        setJiraTicketId(data.key)
        setSummary(data.fields.summary)
      } catch (e) {
        setJiraTicketIdError((e as AxiosError).message)
      }
    }
  }

  const handleFormSubmission = (values: Record<string, string>) => {
    console.log("values", values)

    const { key, summary, timeEntry, description, createdAt } = values

    if (!summary || !summary.length) {
      setSummaryError("Error")
      return
    }

    if (!timeEntry || !timeEntry.length) {
      setTimeEntryError("Error")
      return
    }

    if (!createdAt) {
      setCreatedAtError("Error")
      return
    }

    addTask({
      key,
      summary,
      timeEntry,
      description,
      createdAt: format(createdAt, "yyyy-MM-dd"),
    })

    pop()
  }

  useEffect(() => {
    setJiraTicketIdError(undefined)
  }, [jiraTicketId])

  return (
    <Form
      navigationTitle="Zaraportuj zadanie"
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleFormSubmission} />
          <Action title="Pobierz informacje o Jira Tikecie" onAction={handleFetchJiraSummary} />
        </ActionPanel>
      }
    >
      <Form.DatePicker
        id="createdAt"
        type={Form.DatePicker.Type.Date}
        value={createdAt}
        onChange={(v) => {
          setCreatedAtError(undefined)
          setCreatedAt(v)
        }}
        error={createdAtError}
      />
      <Form.Dropdown id="task" title="Zadanie" onChange={handleDropdownChange}>
        <Form.Dropdown.Item value="newTask" title="Dodaj nowe zadanie" icon={Icon.PlusCircle} />
        <Form.Dropdown.Section title="Istniejące zadania">
          {tasks.map((taskEntry) => (
            <Form.Dropdown.Item
              key={taskEntry.id}
              value={JSON.stringify(taskEntry)}
              title={taskEntry.key ? `${taskEntry.key} - ${taskEntry.summary}` : taskEntry.summary}
              icon={Icon.Cd}
            />
          ))}
        </Form.Dropdown.Section>
      </Form.Dropdown>
      <Form.TextField
        id="key"
        title="Jira ID"
        placeholder="Jira Ticket ID"
        info="Pole to moze pozostać puste gdy nie posiadasz Jira Ticket ID"
        value={jiraTicketId}
        onChange={(value) => setJiraTicketId(value)}
        error={jiraTicketIdError}
      />
      <Form.TextField
        id="summary"
        title="Opis zadania"
        placeholder="Podaj któtki opis zadania"
        value={summary}
        onChange={(value) => {
          setSummaryError(undefined)
          setSummary(value)
        }}
        error={summaryError}
      />
      <Form.TextField
        id="timeEntry"
        title="Czas do zaportowania"
        value={timeEntry}
        onChange={(v) => {
          setTimeEntryError(undefined)
          setTimeEntry(v)
        }}
        error={timeEntryError}
      />
      <Form.TextArea id="description" title="Opis" />
    </Form>
  )
}
