import { useActiveTasks } from "@/hooks/use-active-tasks";
import { useCompletedTasks } from "@/hooks/use-completed-tasks";
import { usePhasesInfo } from "@/hooks/use-phases-info";
import type { DashboardFilters } from "../types";

export function useDashboardOverview(
  filters: DashboardFilters,
  enabled = true,
) {
  const active = useActiveTasks(filters, { enabled });
  const completed = useCompletedTasks(
    { startTime: filters.startTime!, endTime: filters.endTime!, ...filters },
    { enabled },
  );
  const phasesInfo = usePhasesInfo({ enabled });

  return {
    active: active.data,
    completed: completed.data,
    phasesInfo: phasesInfo.data,
    isLoading: active.isLoading || completed.isLoading || phasesInfo.isLoading,
    refetch: () => {
      active.refetch();
      completed.refetch();
      phasesInfo.refetch();
    },
  };
}
