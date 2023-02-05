import { LocalStorage } from "@raycast/api"
import { existsSync, mkdirSync } from "fs"
import { GODZINY_BACKUP_PATH } from "../const"

export const init = async () => {
  if (!existsSync(GODZINY_BACKUP_PATH)) {
    mkdirSync(GODZINY_BACKUP_PATH)
  }

  await LocalStorage.getItem("godziny").then(async (value) => {
    if (!value) {
      await LocalStorage.setItem("godziny", JSON.stringify([]))
    }
  })
}
