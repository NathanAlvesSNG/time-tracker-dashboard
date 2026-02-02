import { useQuery } from "@tanstack/react-query";
import { getWorkedHoursByPerson } from "@/services/dashboard.service";

type Filters = {
  person?: string;
  sourceSystem?: string;
  startTime?: string;
  endTime?: string;
  project?: string;
};

type WorkedHoursPerPerson = {
  person: string;
  workedHours: number;
};

export function useWorkedHoursPerPerson(
  { person, sourceSystem, startTime, endTime, project }: Filters,
  options?: { enabled?: boolean },
) {
  const query = useQuery<WorkedHoursPerPerson[]>({
    queryKey: [
      "worked-hours-person",
      person,
      sourceSystem,
      startTime,
      endTime,
      project,
    ],
    queryFn: async () => {
      const apiFilters = {
        person,
        sourceSystem,
        startTime,
        endTime,
        project,
      };
      const data = await getWorkedHoursByPerson(apiFilters);
      return data;
    },
    enabled: options?.enabled,
    staleTime: 1000 * 60 * 5,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    refetch: query.refetch,
  };
}
