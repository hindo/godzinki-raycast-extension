import { writeFile } from "fs/promises"
import { join } from "node:path"
import { GODZINY_BACKUP_FILE_TEMPLATE, GODZINY_BACKUP_PATH } from "../const"

export const dataToFile = async (data: unknown) => {
  const jsonData = JSON.stringify(data)
  const backupFilename = GODZINY_BACKUP_FILE_TEMPLATE.replace("{timestamp}", new Date().getTime().toString())
  const backupPath = join(GODZINY_BACKUP_PATH, backupFilename)
  await writeFile(backupPath, jsonData, { encoding: "utf-8" })
}
