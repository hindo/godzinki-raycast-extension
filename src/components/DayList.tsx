import { List } from "@raycast/api"
import { useSQL } from "@raycast/utils"
import { useState } from "react"
import { DAY_SUMMARY_LIST_QUERY } from "../lib/queries"
import { Entry } from "../types"

export const DayList = ({ day }: { day: string }) => {
  const [data, setData] = useState([])
  return (
    <List>
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
  )
}
