import { ActionPanel, List, Action, Icon, LocalStorage, confirmAlert, Alert } from "@raycast/api"
import { useState } from "react"
import { AddEntryForm } from "./components/AddEntryForm"
import { DayListItem } from "./components/DayListItem"
import { dataToFile } from "./lib/backup"
import { dayItemSelector, useStore } from "./lib/store"

export default function Command() {
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const days = useStore(dayItemSelector)

  const handleDataBackup = async () => {
    const data = await LocalStorage.getItem("godziny")
    await dataToFile(data)
  }

  const handleStoreClear = async () => {
    if (
      await confirmAlert({
        title: "Jesteś pewnien?",
        message: "Proces czyszczenia magazynu jest nieodwracalny",
        icon: Icon.Trash,
        primaryAction: {
          title: "Usuń",
          style: Alert.ActionStyle.Destructive,
        },
        dismissAction: {
          title: "Anuluj",
        },
      })
    )
      await LocalStorage.removeItem("godziny")
  }

  const handleOnSelectionChange = (value: string | null) => {
    if (value && value === "add-new-entry") {
      setShowDetails(false)
    } else {
      setShowDetails(true)
    }
  }

  return (
    <List
      isShowingDetail={showDetails}
      onSelectionChange={handleOnSelectionChange}
      actions={
        <ActionPanel>
          <Action title="Zrób backup" onAction={handleDataBackup} />
          <Action title="Wyczyść magazyn" onAction={handleStoreClear} />
        </ActionPanel>
      }
    >
      <List.Item
        id="add-new-entry"
        icon={Icon.Plus}
        title="Dodaj nowy wpis"
        actions={
          <ActionPanel>
            <Action.Push title="Przejdź dodowania nowego wpisu" target={<AddEntryForm />} />
          </ActionPanel>
        }
      />
      <List.Section title="Wpisy">
        {days.map((entry) => (
          <DayListItem key={entry.id} entry={entry} showAccessories={!showDetails} />
        ))}
      </List.Section>
    </List>
  )
}
