import { Action, ActionPanel, Detail, Icon, List } from "@raycast/api"
import { TaskEntry } from "../types"

export const TaskListItem = ({ entry }: { entry: TaskEntry }) => {
  return (
    <List.Item
      key={entry.id}
      icon={Icon.ChevronRight}
      title={entry.summary}
      accessories={[
        {
          text: {
            value: `test`,
          },
        },
      ]}
      actions={
        <ActionPanel>
          <Action.Push title="Przejdź do podsumowania dnia" target={<Detail markdown="Hello" />} />
        </ActionPanel>
      }
    />
  )
}
