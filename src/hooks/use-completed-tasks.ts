import { mapCompletedTasks } from "@/mappers/time-tracking.mapper";
import { getCompletedTasks } from "@/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";

type CompletedTasksResponse = {
  person: string;
  project: string;
  task: string;
  sourceSystem: string;
  duration: number;
  startTime: string;
  endTime: string;
};

type Filters = {
  person?: string;
  sourceSystem?: string;
  startTime: string;
  endTime: string;
};

export function useCompletedTasks(
  { person, sourceSystem, startTime, endTime }: Filters,
  options?: { enabled?: boolean },
) {
  const enabled = Boolean(startTime && endTime) && (options?.enabled ?? true);

  const effectiveFilters = {
    person: person ?? "All",
    sourceSystem: sourceSystem ?? "All",
  };

  const query = useQuery<CompletedTasksResponse[]>({
    queryKey: ["completed-tasks", effectiveFilters, startTime, endTime],

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
        startTime,
        endTime,
      };

      const data = await getCompletedTasks(apiFilters);
      return data;
    },

    enabled,
    staleTime: 1000 * 60 * 5,
  });

  const mappedData = mapCompletedTasks(query.data || []);

  return {
    data: mappedData,
    loading: query.isLoading,
    refetch: query.refetch,
  };
}
