import { Action, ActionPanel, Detail, Icon, List } from "@raycast/api"

export const TaskListItem = ({ entry }) => {
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
