import { SourceSystem, TaskStatus } from "./api";

export type TimeTrackingRow = {
  person: string;
  project: string;
  task: string;
  startTime: string;
  duration: number;
  sourceSystem: "Azure DevOps" | "GLPI";
};

export type TimeTrackingPersonalRow = {
  startTime: string;
  project: string;
  task: string;
  duration: number;
  status: TaskStatus;
  sourceSystem: SourceSystem;
};

export type ProductivityRow = {
  person: string;
  availableHours: number;
  workedHours: number;
  doneTasks: number;
  productivity: number;
};
