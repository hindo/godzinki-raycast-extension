import { ActionPanel, List, Action, Icon, Color } from "@raycast/api";
import { useSQL } from "@raycast/utils";
import { AddEntryForm } from "./components/AddEntryForm";
import { DayList } from "./components/DayList";
import { GODZINY_DB } from "./const";
import { DAY_SUMMARY } from "./lib/queries";
import { DayEntry } from "./types";

export default function Command() {
  const { isLoading, data, permissionView } = useSQL<DayEntry>(GODZINY_DB, DAY_SUMMARY);

  if (permissionView) {
    return permissionView;
  }

  return (
    <List isLoading={isLoading}>
      <List.Item
        icon={Icon.Calendar}
        title="Dodaj nowy wpis"
        actions={
          <ActionPanel>
            <Action.Push title="Przejdź dodowania nowego wpisu" target={<AddEntryForm />} />
          </ActionPanel>
        }
      />
      {(data || []).map((entry) => (
        <List.Item
          key={entry.id}
          icon={Icon.ChevronRight}
          title={entry.day}
          accessories={[
            {
              text: {
                value: `Czas: ${entry.timeSummary.toString()}h`,
                color: entry.timeSummary >= 8 ? Color.Green : Color.Red,
              },
            },
          ]}
          actions={
            <ActionPanel>
              <Action.Push title="Przejdź do podsumowania dnia" target={<DayList day={entry.day} />} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
