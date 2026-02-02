import { mapSourceSystemToApi } from "@/mappers/source-system.mapper";
import type { DashboardFilters } from "./types";

export function normalizeDashboardFilters(
  filters: DashboardFilters,
): DashboardFilters {
  return {
    ...filters,
    sourceSystem: mapSourceSystemToApi(filters.sourceSystem),
  };
}
