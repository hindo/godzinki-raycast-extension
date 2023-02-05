import { homedir } from "os"
import { join } from "path"

export const GODZINY_BACKUP_PATH = join(homedir(), ".config/godziny/")
export const GODZINY_BACKUP_FILE_TEMPLATE = "godziny_{timestamp}.json"

export const JIRA_USER = "ppabich@valuelogic.one"
export const JIRA_TOKEN =
  "ATATT3xFfGF02cHsgJG1cEdSuYEXMB0D20Eso-WoeiSgybSbgX99c5jlw9VJzlbmAkXZ_2sUNg1-idlrKKTzdHztym04zTLgUUCn0QqU7akZWwhSZsYIISE2Yw8-1I10WMgN1xARnISYXmE6ufB51fbxxJ3QgmHpi-pEQLyzXeAS20kO8eTbINo=1547957F"
