import { Action, ActionPanel, Alert, confirmAlert, Icon, List } from "@raycast/api"
import { useStore } from "../lib/store"
import { AddEntryForm } from "./AddEntryForm"

export const DayList = ({ day }: { day: string }) => {
  const dayTasks = useStore((store) => store.tasks.filter((task) => task.createdAt === day))
  const { removeTask } = useStore()
  const handleActionRemoveEntry = async (id: string) => {
    if (
      await confirmAlert({
        title: "Jesteś pewnien?",
        message: "Proces usuwania jest nieodwracalny",
        icon: Icon.Trash,
        primaryAction: {
          title: "Usuń",
          style: Alert.ActionStyle.Destructive,
        },
        dismissAction: {
          title: "Anuluj",
        },
      })
    ) {
      removeTask(id)
    }
  }

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
              <Action title="Remove item" onAction={() => handleActionRemoveEntry(entry.id)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  )
}
