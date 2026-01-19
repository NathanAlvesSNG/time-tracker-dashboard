import type { TaskStatus } from "@/types/api";
import type {
  TimeTrackingPersonalRow,
  TimeTrackingRow,
} from "@/types/time-tracking";

type ActiveTaskDbRow = {
  person: string;
  project: string;
  task: string;
  taskId: number;
  startTime: string;
  finishedDuration: number;
  activeDuration: number;
  sourceSystem: string;
};

type AllTimetracksDbRow = {
  person: string;
  project: string;
  task: string;
  startTime: string;
  endTime: string;
  duration: number;
  sourceSystem: string;
};

type UserTasksDbRow = {
  person: string;
  startTime: string;
  task: string;
  project: string;
  duration: number;
  status: string;
  sourceSystem: string;
};

export function mapActiveTasks(rows: ActiveTaskDbRow[]): TimeTrackingRow[] {
  return rows.map((row) => {
    const totalSeconds =
      (row.finishedDuration ?? 0) + (row.activeDuration ?? 0);

    return {
      person: row.person,
      project: row.project,
      task: row.task,
      startTime: row.startTime,
      sourceSystem: row.sourceSystem === "iZit" ? "IZIT" : "Azure DevOps",
      duration: totalSeconds,
    };
  });
}

export function mapCompletedTasks(
  rows: AllTimetracksDbRow[]
): TimeTrackingRow[] {
  return rows.map((row) => {
    return {
      person: row.person,
      project: row.project,
      task: row.task,
      startTime: row.startTime,
      endTime: row.endTime,
      duration: row.duration,
      sourceSystem: row.sourceSystem === "iZit" ? "IZIT" : "Azure DevOps",
    };
  });
}

export function mapAllUserTasks(
  rows: UserTasksDbRow[]
): TimeTrackingPersonalRow[] {
  return rows.map((row) => {
    return {
      person: row.person,
      startTime: row.startTime,
      project: row.project,
      task: row.task,
      duration: row.duration,
      status: row.status as TaskStatus,
      sourceSystem: row.sourceSystem === "iZit" ? "IZIT" : "Azure DevOps",
    };
  });
}
