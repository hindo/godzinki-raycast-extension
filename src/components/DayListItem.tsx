import { Action, ActionPanel, Clipboard, Color, Icon, List } from "@raycast/api"
import { Fragment } from "react"
import { DayEntry, useStore } from "../lib/store"
import { DayList } from "./DayList";

export const DayListItem = ({ entry, showAccessories = true }: { entry: DayEntry; showAccessories: boolean }) => {
  const tasks = useStore((state) => state.tasks)

  const dayTasks = tasks.filter((task) => task.createdAt === entry.day)

  const handleCopyDaySummaryToClipboard = async () => {
    const summary = dayTasks.map(task => {
      return task.key ? task.key : task.summary
    }).reduce((acc: string[], task: string) => {
      if (acc.includes(task)) {
        return acc
      }
      return [...acc, task]
    }, []).sort().join('; ')
    await Clipboard.copy(summary)
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
