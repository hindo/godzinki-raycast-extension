import { type } from "os";

export type TimeEntry = {
  id: number;
  czas: number;
  created_at: number;
};

export type TaskEntry = {
  id: number;
  key: string;
  summary: string;
};

export type Entry = {
  id: number;
} & Omit<TimeEntry, "id"> &
  Omit<TaskEntry, "id">;

export type DayEntry = {
  id: number;
  day: string;
  timeSummary: number;
};
