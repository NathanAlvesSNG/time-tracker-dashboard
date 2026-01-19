import { mapSourceSystemToApi } from "@/mappers/source-system.mapper";
import { getWorkedHoursDay } from "@/services/dashboard.service";
import { WorkedHoursPerDay } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

type Filters = {
  person?: string;
  sourceSystem?: string;
  project?: string;
  startTime?: string;
  endTime?: string;
};

export function useWorkedHoursDay(
  filters: Filters,
  options?: { enabled?: boolean }
) {
  const query = useQuery<WorkedHoursPerDay[]>({
    queryKey: [
      "worked-hours-day",
      filters.person,
      filters.sourceSystem,
      filters.project,
      filters.startTime,
      filters.endTime,
    ],
    enabled: options?.enabled,
    queryFn: async () => {
      const data = await getWorkedHoursDay(filters);

      return data;
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    refetch: query.refetch,
  };
}
