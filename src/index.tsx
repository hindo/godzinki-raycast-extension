import {
  ActionPanel,
  List,
  Action,
  Icon,
  LocalStorage,
  confirmAlert,
  Alert,
  showToast,
  openExtensionPreferences,
} from "@raycast/api"
import { useState } from "react"
import { AddEntryForm } from "./components/AddEntryForm"
import { DayListItem } from "./components/DayListItem"
import { dataToFile } from "./lib/backup"
import { dayItemSelector, useStore } from "./lib/store"

export default function Command() {
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const days = useStore(dayItemSelector)
  const { fixTasks } = useStore()

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

  const handleFixTimeEntries = async () => {
    if (
      await confirmAlert({
        title: "Czy chciałbyś zapisać kopię danych?",
        message: "Naprawa powinna działać bez problemów, ale nie daję grarancji.",
        icon: Icon.Info,
        primaryAction: {
          title: "Wykonaj utworzenie kopii",
          style: Alert.ActionStyle.Default,
        },
        dismissAction: {
          title: "Anuluj",
        },
      })
    ) {
      await handleDataBackup()
    }
    fixTasks()
    await showToast({ title: "Naprawa danych", message: `` })
  }

  return (
    <List isShowingDetail={showDetails} onSelectionChange={handleOnSelectionChange}>
      <List.Item
        id="add-new-entry"
        icon={Icon.Plus}
        title="Dodaj nowy wpis"
        actions={
          <ActionPanel>
            <Action.Push title="Przejdź do dowania nowego wpisu" target={<AddEntryForm />} />
            <Action title="Zrób backup" onAction={handleDataBackup} />
            <Action title="Napraw błędne wpisy" onAction={handleFixTimeEntries} />
            <Action title="Wyczyść magazyn" onAction={handleStoreClear} />
            <Action title="Otwórz ustawienia" onAction={openExtensionPreferences} />
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
