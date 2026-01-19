import { useWorkedHoursPerPerson } from "@/hooks/use-worked-hours-person";
import { useWorkedHoursProject } from "@/hooks/use-worked-hours-project";
import { useWorkedHoursProjectPerson } from "@/hooks/use-worked-hours-project-person";
import { DashboardFilters } from "../types";
import { normalizeDashboardFilters } from "@/hooks/dashboard/filter";
import { useWorkedHoursDay } from "@/hooks/use-worked-hours-day";

export function useDashboardWorkedHours(
  filters: DashboardFilters,
  enabled = true
) {
  const normalizedFilters = normalizeDashboardFilters(filters);

  const day = useWorkedHoursDay(normalizedFilters, { enabled });
  const perPerson = useWorkedHoursPerPerson(normalizedFilters, { enabled });
  const perProjectPerson = useWorkedHoursProjectPerson(normalizedFilters, {
    enabled,
  });
  const perProject = useWorkedHoursProject(normalizedFilters, { enabled });

  const isLoading =
    day.isLoading ||
    perPerson.isLoading ||
    perProjectPerson.isLoading ||
    perProject.isLoading;

  const refetch = () => {
    day.refetch();
    perPerson.refetch();
    perProjectPerson.refetch();
    perProject.refetch();
  };

  return {
    day: day.data,
    perPerson: perPerson.data,
    perProjectPerson: perProjectPerson.data,
    perProject: perProject.data,

    isLoading,
    refetch,
  };
}
