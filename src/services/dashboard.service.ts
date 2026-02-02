import { api } from "./api";

export async function getUserByName(params?: { userName: string }) {
  const { data } = await api.get("/dashboard/user", { params });
  return data;
}

export async function getActiveTasks(params?: {
  person?: string;
  sourceSystem?: string;
}) {
  const { data } = await api.get("/dashboard/active-tasks", {
    params,
  });

  return data;
}

export async function getCompletedTasks(params?: {
  person?: string;
  sourceSystem?: string;
  startTime?: string;
  endTime?: string;
}) {
  const { data } = await api.get("/dashboard/finished-tasks", {
    params,
  });

  return data;
}

export async function getUserProductivity(params?: {
  userId?: number;
  startTime?: string;
  endTime?: string;
}) {
  const { data } = await api.get("/dashboard/user-productivity", {
    params,
  });

  return data;
}

export async function getAllUserTasks(params: {
  userId: number;
  startTime?: string;
  endTime?: string;
  sourceSystem?: string;
}) {
  const { data } = await api.get("/dashboard/user-tasks", {
    params,
  });
  return data;
}

export async function getUserScore(params?: {
  userId: number;
  startTime: string;
  endTime: string;
  sourceSystem?: string;
}) {
  const { data } = await api.get("/dashboard/score", {
    params,
  });
  return data;
}

export async function getUserDailyProductivity(params?: {
  userId: number;
  startTime: string;
  endTime: string;
  sourceSystem?: string;
}) {
  const { data } = await api.get("/dashboard/user-daily-productivity", {
    params,
  });
  return data;
}

export async function getWorkedHoursDay(params?: {
  person?: string;
  sourceSystem?: string;
  project?: string;
  startTime?: string;
  endTime?: string;
}) {
  const { data } = await api.get("/dashboard/worked-hours-by-day", {
    params,
  });
  return data;
}

export async function getFilterOptions() {
  const { data } = await api.get("/dashboard/filter-options");
  return data;
}

export async function getWorkedHoursByPerson(params?: {
  person?: string;
  sourceSystem?: string;
  project?: string;
  startTime?: string;
  endTime?: string;
}) {
  const { data } = await api.get("/dashboard/worked-hours-by-person", {
    params,
  });
  return data;
}

export async function getWorkedHoursByProjectAndPerson(params?: {
  person?: string;
  project?: string;
  startTime?: string;
  endTime?: string;
}) {
  const { data } = await api.get(
    "/dashboard/worked-hours-by-person-and-project",
    {
      params,
    },
  );
  return data;
}

export async function getWorkedHoursByProject(params?: {
  person?: string;
  startTime?: string;
  endTime?: string;
  project?: string;
}) {
  const { data } = await api.get("/dashboard/worked-hours-by-project", {
    params,
  });
  return data;
}

export async function getAverageTicketSolution(params?: {
  person?: string;
  startTime?: string;
  endTime?: string;
}) {
  const { data } = await api.get("/dashboard/average-solution-time-ticket", {
    params,
  });
  return data;
}

export async function getHighestSolutionTimeTicket(params?: {
  person?: string;
  startTime?: string;
  endTime?: string;
}) {
  const { data } = await api.get("/dashboard/highest-solution-time-ticket", {
    params,
  });
  return data;
}

export async function getSlaTicket(params?: {
  person?: string;
  startTime?: string;
  endTime?: string;
}) {
  const { data } = await api.get("/dashboard/sla-ticket", { params });
  return data;
}

export async function getUsersProductivity(params?: {
  startTime: string;
  endTime: string;
  sourceSystem?: string;
}) {
  const { data } = await api.get("/dashboard/users-productivity", { params });
  return data;
}

export async function getPhasesInfo(params?: {
  startTime: string;
  endTime: string;
}) {
  const { data } = await api.get("/dashboard/phases", { params });
  return data;
}
