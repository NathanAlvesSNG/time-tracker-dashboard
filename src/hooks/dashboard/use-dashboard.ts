import { useDashboardOverview } from "./overview/useDashboardOverview";
import { useDashboardPersonal } from "./personal/use-dashboard-personal";
import { useDashboardProductivity } from "./productivity/use-dashboard-productivity";
import { useDashboardTicket } from "./tickets/use-dashboard-ticket";
import type { DashboardDataOptions, DashboardFilters } from "./types";
import { useDashboardWorkedHours } from "./worked-hours/use-dashboard-worked-hours";

export function useDashboard(
  filters: DashboardFilters,
  options: DashboardDataOptions = {},
  isAdmin = false,
) {
  const overview = useDashboardOverview(filters, options.loadOverview);

  const productivity = useDashboardProductivity(
    filters,
    options.loadProductivity,
    isAdmin,
  );

  const workedHours = useDashboardWorkedHours(filters, options.loadWorkedHours);

  const sla = useDashboardTicket(filters, options.loadSla);

  const personal = useDashboardPersonal(filters, options.loadPersonal, isAdmin);

  const isLoading =
    overview.isLoading ||
    productivity.isLoading ||
    workedHours.isLoading ||
    sla.isLoading ||
    personal.isLoading;

  const refetchAll = () => {
    overview.refetch?.();
    productivity.refetch?.();
    workedHours.refetch?.();
    sla.refetch?.();
    personal.refetch?.();
  };

  return {
    overview,
    productivity,
    workedHours,
    sla,
    personal,

    isLoading,
    refetchAll,
  };
}
