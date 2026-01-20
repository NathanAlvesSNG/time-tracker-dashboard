import { getWorkedHoursByProject } from "@/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";

type Filters = {
  person?: string;
  startTime?: string;
  endTime?: string;
  project?: string;
};

type WorkedHoursByProjectResponse = {
  project: string;
  workedHours: number;
};

export function useWorkedHoursProject(
  { person, startTime, endTime, project }: Filters,
  options?: { enabled?: boolean },
) {
  const query = useQuery<WorkedHoursByProjectResponse[]>({
    queryKey: ["worked-hours-project", person, startTime, endTime, project],
    queryFn: async () => {
      const data = await getWorkedHoursByProject({
        person,
        startTime,
        endTime,
        project,
      });
      return data;
    },
    enabled: options?.enabled,
    staleTime: 1000 * 60 * 5,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}
