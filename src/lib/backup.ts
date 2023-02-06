import { showToast } from "@raycast/api"
import { existsSync, mkdirSync } from "fs"
import { writeFile } from "fs/promises"
import { join } from "node:path"
import { GODZINY_BACKUP_FILE_TEMPLATE, GODZINY_BACKUP_PATH } from "../const"

const initBackUpFolder = () => {
  if (!existsSync(GODZINY_BACKUP_PATH)) {
    mkdirSync(GODZINY_BACKUP_PATH)
  }
}

export const dataToFile = async (data: unknown) => {
  initBackUpFolder()

  const jsonData = JSON.stringify(data)
  const backupFilename = GODZINY_BACKUP_FILE_TEMPLATE.replace("{timestamp}", new Date().getTime().toString())
  const backupPath = join(GODZINY_BACKUP_PATH, backupFilename)
  await writeFile(backupPath, jsonData, { encoding: "utf-8" })

  await showToast({ title: "Godziny Backup", message: `Backup file (${backupFilename}) created.` })
}
