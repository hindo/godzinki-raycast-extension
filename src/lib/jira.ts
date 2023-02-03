import axios from "axios";

const JIRA_URL = "https://pcol.atlassian.net/rest/api/2/issue/{tickedId}?fields=summary,status";
const JIRA_USER = "ppabich@valuelogic.one";
const JIRA_TOKEN =
  "ATATT3xFfGF02cHsgJG1cEdSuYEXMB0D20Eso-WoeiSgybSbgX99c5jlw9VJzlbmAkXZ_2sUNg1-idlrKKTzdHztym04zTLgUUCn0QqU7akZWwhSZsYIISE2Yw8-1I10WMgN1xARnISYXmE6ufB51fbxxJ3QgmHpi-pEQLyzXeAS20kO8eTbINo=1547957F";

export const fetchJiraSummary = async (tickedId: string) => {

  const url = JIRA_URL.replaceAll('{tickedId}', tickedId)

  const headers = {
    'Authorization': `Basic ${Buffer.from(JIRA_USER+':'+JIRA_TOKEN).toString('base64')}`
  }

  const response = await axios({
    method: 'GET',
    url: url,
    headers: headers,
  })

  return response.data
}
