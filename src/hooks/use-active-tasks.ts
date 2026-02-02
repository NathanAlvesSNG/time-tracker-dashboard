import { useQuery } from "@tanstack/react-query";
import { mapActiveTasks } from "@/mappers/time-tracking.mapper";
import { getActiveTasks } from "@/services/dashboard.service";

type ActiveTasksResponse = {
  person: string;
  project: string;
  task: string;
  taskId: number;
  startTime: string;
  finishedDuration: number;
  activeDuration: number;
  sourceSystem: string;
};

type Filters = {
  person?: string;
  sourceSystem?: string;
};

export function useActiveTasks(
  { person, sourceSystem }: Filters,
  options?: { enabled?: boolean },
) {
  const effectiveFilters = {
    person: person ?? "All",
    sourceSystem: sourceSystem ?? "All",
  };

  const query = useQuery<ActiveTasksResponse[]>({
    queryKey: ["active-tasks", effectiveFilters],
    queryFn: async () => {
      const apiFilters = {
        person:
          effectiveFilters.person === "All"
            ? undefined
            : effectiveFilters.person,
        sourceSystem:
          effectiveFilters.sourceSystem === "All"
            ? undefined
            : effectiveFilters.sourceSystem,
      };
      const data = await getActiveTasks(apiFilters);

      return data;
    },
    enabled: options?.enabled,
    staleTime: 1000 * 60 * 5,
  });

  const mappedData = mapActiveTasks(query.data || []);

  return {
    data: mappedData,
    isLoading: query.isLoading,
    refetch: query.refetch,
  };
}
