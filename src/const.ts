import { homedir } from "os"
import { join } from "path"

export const GODZINY_BACKUP_PATH = join(homedir(), ".config/godziny/")
export const GODZINY_BACKUP_FILE_TEMPLATE = "godziny_{timestamp}.json"
