export type SourceSystem = "ADO" | "GLPI";

export type TaskStatus = "1" | "2" | "3";
// 1: Em andamento
// 2: Concluído
// 3: Pausado

export type UserRole = "admin" | "user" | "viewer";

export interface Task {
  id: number;
  taskId: string;
  taskName: string;
  service_id: string;
  url: string;
}

export interface TimeTracks {
  id: number;
  user_id: string;
  task_id: string;
  startTime: string;
  endTime: string | null;
  duration: number | null;
  status: TaskStatus;
  notes: string | null;
}

export interface Service {
  id: number;
  serviceId: string;
  serviceName: string;
  sourceSystem: SourceSystem;
}

export interface User {
  id: number;
  userName: string;
  userEmail: string;
  userIdADO: string;
  role: UserRole;
  cargaHoraria: number;
  userIdGLPI: string;
}

export interface TimeTrackResponse {
  data: TimeTracks[];
  total: number;
}

export interface DashboardFilters {
  startDate?: string;
  endDate?: string;
  userEmail?: string;
  sourceSystem?: SourceSystem;
}
