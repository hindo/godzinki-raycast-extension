import { Action, ActionPanel, Color, Icon, List } from "@raycast/api"
import { DayList } from "./DayList"

export const DayListItem = ({ entry }) => {
  return (
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
  )
}
