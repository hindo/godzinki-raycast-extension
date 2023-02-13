import { Action, ActionPanel, List } from "@raycast/api"
import { useStore } from "../lib/store"
import { AddEntryForm } from "./AddEntryForm"

export const DayList = ({ day }: { day: string }) => {
  const dayTasks = useStore(store => store.tasks.filter(task => task.createdAt === day))
  return (
    <List>
      {dayTasks.map((entry) => (
        <List.Item
          key={entry.id}
          title={entry.summary}
          accessories={[
            {
              text: `${entry.timeEntry}h`,
            },
          ]}
          actions={
            <ActionPanel>
              <Action.Push title="Edytuj wpis" target={<AddEntryForm entry={entry} />} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  )
}
