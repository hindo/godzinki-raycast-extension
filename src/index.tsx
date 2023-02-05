import { ActionPanel, List, Action, Icon, LocalStorage } from "@raycast/api"
import { AddEntryForm } from "./components/AddEntryForm"
import { DayListItem } from "./components/DayListItem"
import { dataToFile } from "./lib/backup"
import { dayItemSelector, useStore } from "./lib/store"

export default function Command() {
  const days = useStore(dayItemSelector)

  const handleDataBackup = async () => {
    const data = await LocalStorage.getItem("godziny")
    await dataToFile(data)
  }

  return (
    <List>
      <List.Item
        icon={Icon.Calendar}
        title="Dodaj nowy wpis"
        actions={
          <ActionPanel>
            <Action.Push title="Przejdź dodowania nowego wpisu" target={<AddEntryForm />} />
            <Action title="Zrób backup" onAction={handleDataBackup} />
            <Action title="Wyczyść magazyn" onAction={async () => await LocalStorage.removeItem("godziny")} />
          </ActionPanel>
        }
      />
      {days.map((entry) => (
        <DayListItem key={entry.id} entry={entry} />
      ))}
    </List>
  )
}
