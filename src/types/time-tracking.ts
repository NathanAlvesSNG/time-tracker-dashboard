export type TimeTrackingRow = {
  person: string;
  project: string;
  task: string;
  startTime: string; // ISO string
  duration: number; // duration in seconds
  sourceSystem: "Azure DevOps" | "GLPI";
};
