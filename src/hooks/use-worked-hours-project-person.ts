import { getWorkedHoursByProjectAndPerson } from "@/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";

type Filters = {
  person?: string;
  startTime?: string;
  endTime?: string;
  project?: string;
};

type WorkedHoursPerProjectAndPerson = {
  person: string;
  project: string;
  workedHours: number;
};

export function useWorkedHoursProjectPerson(
  filters: Filters,
  options?: { enabled?: boolean }
) {
  const query = useQuery<WorkedHoursPerProjectAndPerson[]>({
    queryKey: [
      "worked-hours-project-person",
      filters.person,
      filters.startTime,
      filters.endTime,
      filters.project,
    ],
    queryFn: async () => {
      const data = await getWorkedHoursByProjectAndPerson(filters);
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
