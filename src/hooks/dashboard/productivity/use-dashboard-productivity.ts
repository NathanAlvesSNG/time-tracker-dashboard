import { useDailyProductivity } from "@/hooks/use-daily-productivity";
import { useProductivity } from "@/hooks/use-productivity";
import { useUsersProductivity } from "@/hooks/use-users-productivity";
import type { DashboardFilters } from "../types";

export function useDashboardProductivity(
  filters: DashboardFilters,
  enabled = true,
  isAdmin = false,
) {
  const productivity = useProductivity(
    {
      startTime: filters.startTime!,
      endTime: filters.endTime!,
      person: filters.person,
      sourceSystem: filters.sourceSystem,
    },
    { enabled },
    isAdmin,
  );
  const daily = useDailyProductivity(
    {
      startTime: filters.startTime!,
      endTime: filters.endTime!,
      person: filters.person,
    },
    { enabled },
    isAdmin,
  );
  const allUsersProductivity = useUsersProductivity(
    {
      startTime: filters.startTime!,
      endTime: filters.endTime!,
    },
    { enabled },
  );

  const isLoading =
    productivity.isLoading || daily.isLoading || allUsersProductivity.isLoading;

  const refetch = () => {
    productivity.refetch();
    daily.refetch();
    allUsersProductivity.refetch();
  };

  return {
    productivity: productivity.data,
    daily: daily.data,
    allUsersProductivity: allUsersProductivity.data,

    isLoading,
    refetch,
  };
}
