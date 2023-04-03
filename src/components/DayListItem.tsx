import { Action, ActionPanel, Clipboard, Color, Icon, List } from "@raycast/api"
import endOfMonth from "date-fns/endOfMonth"
import startOfMonth from "date-fns/startOfMonth"
import { Fragment } from "react"
import { DayEntry, Task, useStore } from "../lib/store"
import { DayList } from "./DayList"

export const DayListItem = ({ entry, showAccessories = true }: { entry: DayEntry; showAccessories: boolean }) => {
  const tasks = useStore((state) => state.tasks)

  const dayTasks = tasks.filter((task) => task.createdAt === entry.day)

  const handleCopyDaySummaryToClipboard = async () => {
    const summary = dayTasks
      .map((task) => {
        return task.key ? task.key : task.summary
      })
      .reduce((acc: string[], task: string) => {
        if (acc.includes(task)) {
          return acc
        }
        return [...acc, task]
      }, [])
      .sort()
      .join("; ")
    await Clipboard.copy(summary)
  }

  const handleCopyMonthSummaryToClipboard = async () => {
    const monthStart = startOfMonth(new Date(entry.day))
    const monthEnd = endOfMonth(new Date(entry.day))

    const summary = tasks
      .filter((task) => {
        const createdAtDate = new Date(task.createdAt)
        return createdAtDate >= monthStart && createdAtDate <= monthEnd
      })
      .reduce((acc: Task[], task: Task) => {
        const entry = acc.find((entry: Task) => entry.key === task.key && entry.summary === task.summary)
        if (entry) {
          const updatedEntry = {
            ...entry,
            timeEntry: (parseFloat(entry.timeEntry) + parseFloat(task.timeEntry)).toString(),
          } as Task
          console.log(updatedEntry)
          return [...acc.filter((task) => task.id !== entry.id), updatedEntry]
        }

        return [...acc, task]
      }, [])
      .map((task) => {
        return `${task.key};${task.summary};?;${task.timeEntry}`
      })
      .join("\n")

    await Clipboard.copy(
      `Jira;Opis zadania;Status;Czas
      ${summary}`
    )
  }

  return (
    <List.Item
      id={entry.id}
      key={entry.id}
      icon={Icon.Calendar}
      title={entry.title}
      accessories={[
        showAccessories
          ? {
              text: {
                value: `Czas: ${entry.timeSummary.toString()}h`,
                color: entry.timeSummary >= 8 ? Color.Green : Color.Red,
              },
            }
          : {},
      ]}
      actions={
        <ActionPanel>
          <Action.Push title="Zobacz listę" target={<DayList day={entry.day} />} />
          <Action title="Copy day summary to clipboard" onAction={() => handleCopyDaySummaryToClipboard()} />
          <Action title="Copy month summary to clipboard" onAction={() => handleCopyMonthSummaryToClipboard()} />
        </ActionPanel>
      }
      detail={
        <List.Item.Detail
          metadata={
            <List.Item.Detail.Metadata>
              {dayTasks.map((task, idx) => (
                <Fragment key={`${task.id}-${idx}`}>
                  <List.Item.Detail.Metadata.Label
                    title="Zadanie"
                    icon={Icon.Hashtag}
                    text={task.key ? `${task.key} - ${task.summary}` : task.summary}
                  />
                  <List.Item.Detail.Metadata.Label title="Ilość godzin" icon={Icon.Clock} text={`${task.timeEntry}h`} />
                  {task.description ? <List.Item.Detail.Metadata.Label title="Opis" text={task.description} /> : null}
                  <List.Item.Detail.Metadata.Separator />
                </Fragment>
              ))}
            </List.Item.Detail.Metadata>
          }
        />
      }
    />
  )
}
