export const createHoursTable = `
  CREATE TABLE IF NOT EXISTS hours (
    id         INTEGER NOT NULL,
    timeEntry  INTEGER NOT NULL,
    created_at INTEGER NOT NULL DEFAULT CURRENT_DATE,
    task_id    INTEGER NOT NULL,
    PRIMARY KEY (
      id AUTOINCREMENT
    )
  );
`

export const createTasksTable = `
  CREATE TABLE IF NOT EXISTS tasks (
    id      INTEGER NOT NULL,
    ticket  TEXT    NULL,
    summary TEXT    NOT NULL,
    PRIMARY KEY (
        id AUTOINCREMENT
    )
  );
`

export const SUMMARY_LIST_QUERY =
  "SELECT hours.id, tasks.key, tasks.summary, hours.timeEntry, hours.created_at FROM hours INNER JOIN tasks ON hours.task_id = tasks.id"

export const DAY_SUMMARY_LIST_QUERY =
  "SELECT hours.id, tasks.key, tasks.summary, hours.czas, hours.created_at FROM hours INNER JOIN tasks ON hours.task_id = tasks.id WHERE created_at >= datetime('{day}', 'start of day') AND created_at < datetime('{day}', 'start of day', '+1 day');"

export const TASK_LIST = "SELECT * FROM tasks"

export const DAY_SUMMARY =
  "SELECT id, date(created_at) as day, SUM(timeEntry) as timeSummary FROM hours GROUP BY  date(created_at) ORDER BY day DESC;"

export const INSERT_TASK = "INSERT INTO tasks (ticket, summary) VALUES (:ticket, :summary)"
