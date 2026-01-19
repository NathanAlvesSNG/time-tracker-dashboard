import { useActiveTasks } from "@/hooks/use-active-tasks";
import { useCompletedTasks } from "@/hooks/use-completed-tasks";
import { DashboardFilters } from "../types";

export function useDashboardOverview(
  filters: DashboardFilters,
  enabled = true
) {
  const active = useActiveTasks(filters, { enabled });
  const completed = useCompletedTasks(
    { startTime: filters.startTime!, endTime: filters.endTime!, ...filters },
    { enabled }
  );

  return {
    active: active.data,
    completed: completed.data,
    isLoading: active.isLoading || completed.loading,
    refetch: () => {
      active.refetch();
      completed.refetch();
    },
  };
}
