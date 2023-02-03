export const SUMMARY_LIST_QUERY =
  "SELECT hours.id, tasks.key, tasks.summary, hours.czas, hours.created_at FROM hours INNER JOIN tasks ON hours.task_id = tasks.id";

export const DAY_SUMMARY_LIST_QUERY =
  "SELECT hours.id, tasks.key, tasks.summary, hours.czas, hours.created_at FROM hours INNER JOIN tasks ON hours.task_id = tasks.id WHERE created_at > datetime('{day} 00:00:00') AND created_at <= datetime('{day} 23:59:59');";

export const TASK_LIST = "SELECT * FROM tasks";

export const DAY_SUMMARY =
  "SELECT id, date(created_at) as day, SUM(czas) timeSummary FROM hours GROUP BY  date(created_at) ORDER BY day DESC;";
