export type DashboardFilters = {
  person?: string;
  sourceSystem?: string;
  startTime?: string;
  endTime?: string;
  status?: string;
  project?: string;
};

export type DashboardDataOptions = {
  loadOverview?: boolean;
  loadProductivity?: boolean;
  loadWorkedHours?: boolean;
  loadSla?: boolean;
  loadPersonal?: boolean;
};
