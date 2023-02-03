import { List } from "@raycast/api";
import { useSQL } from "@raycast/utils";
import { GODZINY_DB } from "../const";
import { DAY_SUMMARY_LIST_QUERY } from "../lib/queries";
import { Entry } from "../types";

export const DayList = ({ day }: { day: string }) => {
  const { isLoading, data, permissionView } = useSQL<Entry>(
    GODZINY_DB,
    DAY_SUMMARY_LIST_QUERY.replaceAll("{day}", day)
  );

  if (permissionView) {
    return permissionView;
  }

  return (
    <List isLoading={isLoading}>
      {(data || []).map((entry) => (
        <List.Item
          key={entry.id}
          title={entry.summary}
          accessories={[
            {
              text: `${entry.czas}h`,
            },
          ]}
        />
      ))}
    </List>
  );
};
