import { DashboardFilters } from "./types";
import { mapSourceSystemToApi } from "@/mappers/source-system.mapper";

export function normalizeDashboardFilters(
  filters: DashboardFilters
): DashboardFilters {
  return {
    ...filters,
    sourceSystem: mapSourceSystemToApi(filters.sourceSystem),
  };
}
