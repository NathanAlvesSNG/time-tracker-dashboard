import { useUserScore } from "@/hooks/use-user-score";
import type { DashboardFilters } from "../types";
import { useUserTasks } from "@/hooks/use-user-tasks";

export function useDashboardPersonal(
  filters: DashboardFilters,
  enabled = true,
  isAdmin = false,
) {
  const score = useUserScore(
    {
      startTime: filters.startTime!,
      endTime: filters.endTime!,
      sourceSystem: filters.sourceSystem,
      person: filters.person,
    },
    { enabled },
    isAdmin,
  );
  const userTasks = useUserTasks(
    {
      startTime: filters.startTime!,
      endTime: filters.endTime!,
      sourceSystem: filters.sourceSystem,
      person: filters.person,
    },
    { enabled },
    isAdmin,
  );

  return {
    score: score.data,
    userTasks: userTasks.data,
    isLoading: score.isLoading || userTasks.isLoading,
    refetch: () => {
      score.refetch();
      userTasks.refetch();
    },
  };
}
