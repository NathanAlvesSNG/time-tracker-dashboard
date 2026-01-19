import { getActiveTasks } from "@/services/dashboard.service";
import { mapActiveTasks } from "@/mappers/time-tracking.mapper";
import { mapSourceSystemToApi } from "@/mappers/source-system.mapper";
import { useQuery } from "@tanstack/react-query";

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
  options?: { enabled?: boolean }
) {
  const query = useQuery<ActiveTasksResponse[]>({
    queryKey: ["active-tasks", person, sourceSystem],
    queryFn: async () => {
      const data = await getActiveTasks({ person, sourceSystem });

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
