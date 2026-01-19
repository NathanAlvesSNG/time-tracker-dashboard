import { useProductivity } from "@/hooks/use-productivity";
import { useDailyProductivity } from "@/hooks/use-daily-productivity";
import { DashboardFilters } from "../types";
import { useUsersProductivity } from "@/hooks/use-users-productivity";

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
