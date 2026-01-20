import { mapCompletedTasks } from "@/mappers/time-tracking.mapper";
import { getCompletedTasks } from "@/services/dashboard.service";
import { mapSourceSystemToApi } from "@/mappers/source-system.mapper";
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

  const query = useQuery<CompletedTasksResponse[]>({
    queryKey: ["completed-tasks", person, startTime, endTime, sourceSystem],
    queryFn: async () => {
      const data = await getCompletedTasks({
        person,
        startTime,
        endTime,
        sourceSystem,
      });

      return data;
    },
    enabled: enabled,
    staleTime: 1000 * 60 * 5,
  });

  const mappedData = mapCompletedTasks(query.data || []);

  return {
    data: mappedData,
    loading: query.isLoading,
    refetch: query.refetch,
  };
}
