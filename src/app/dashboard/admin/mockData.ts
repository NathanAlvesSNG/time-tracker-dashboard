import {
  type DailyHours,
  type TotalHoursPerPersonPerProject,
  type WorkedHoursPerDay,
  type WorkedHoursPerPerson,
  type WorkedHoursPerProject,
} from "@/types/api";

export const workedHoursPerDayData: WorkedHoursPerDay[] = [
  { date: "2023-01-01", workedHours: 8 },
  { date: "2023-01-02", workedHours: 6 },
  { date: "2023-01-03", workedHours: 5 },
  { date: "2023-01-04", workedHours: 4 },
  { date: "2023-01-05", workedHours: 3 },
  { date: "2023-01-06", workedHours: 2 },
  { date: "2023-01-07", workedHours: 1 },
];

export const workedHoursPerProjectData: WorkedHoursPerProject[] = [
  { project: "Projeto 1", workedHours: 8 },
  { project: "Projeto 2", workedHours: 6 },
  { project: "Projeto 3", workedHours: 5 },
  { project: "Projeto 4", workedHours: 4 },
  { project: "Projeto 5", workedHours: 3 },
  { project: "Projeto 6", workedHours: 2 },
  { project: "Projeto 7", workedHours: 1 },
];

export const totalHoursPerPersonPerProjectData = [
  {
    person: "Gabriel",
    project: "Projeto A",
    workedHours: 32,
  },
  {
    person: "Gabriel",
    project: "Projeto B",
    workedHours: 18,
  },
  {
    person: "Gabriel",
    project: "Projeto C",
    workedHours: 10,
  },

  {
    person: "Ana",
    project: "Projeto A",
    workedHours: 24,
  },
  {
    person: "Ana",
    project: "Projeto B",
    workedHours: 30,
  },
  {
    person: "Ana",
    project: "Projeto C",
    workedHours: 14,
  },

  {
    person: "Lucas",
    project: "Projeto A",
    workedHours: 40,
  },
  {
    person: "Lucas",
    project: "Projeto B",
    workedHours: 22,
  },
  {
    person: "Lucas",
    project: "Projeto C",
    workedHours: 16,
  },
] satisfies TotalHoursPerPersonPerProject[];

export const workedHoursPerPersonBarChartData: WorkedHoursPerPerson[] = [
  { person: "Gabriel", workedHours: 42 },
  { person: "Ana", workedHours: 36 },
  { person: "Lucas", workedHours: 28 },
  { person: "Mariana", workedHours: 31 },
];

export const productivityData = [
  { date: "2024-06-01", productivity: 80 },
  { date: "2024-06-02", productivity: 83 },
  { date: "2024-06-03", productivity: 85 },
  { date: "2024-06-04", productivity: 90 },
  { date: "2024-06-05", productivity: 88 },
];

export const dailyHoursData: DailyHours[] = [
  { date: "2024-06-01", available: 5, worked: 4 },
  { date: "2024-06-02", available: 6, worked: 5 },
  { date: "2024-06-03", available: 4, worked: 3 },
  { date: "2024-06-04", available: 7, worked: 6 },
  { date: "2024-06-05", available: 5, worked: 5 },
  { date: "2024-06-06", available: 6, worked: 4 },
  { date: "2024-06-07", available: 5, worked: 5 },
];
