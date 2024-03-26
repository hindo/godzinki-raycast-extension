import axios from "axios"
import { getPreferenceValues } from "@raycast/api"
import { Preferences } from "../types"

export const fetchJiraSummary = async (tickedId: string) => {
  const preferences = getPreferenceValues<Preferences>()
  const url = `${preferences.jiraUrl}/rest/api/2/issue/{tickedId}?fields=summary,status`.replaceAll(
    "{tickedId}",
    tickedId
  )

  const headers = {
    Authorization: `Basic ${Buffer.from(preferences.jiraUser + ":" + preferences.jiraToken).toString("base64")}`,
  }

  const response = await axios({
    method: "GET",
    url: url,
    headers: headers,
  })

  return response.data
}
