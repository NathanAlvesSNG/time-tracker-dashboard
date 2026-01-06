import { DashboardFilters, TimeTracks } from "@/types/api";
import { api } from "./api";

export const getTimeTracks = async (
  filters?: DashboardFilters
): Promise<TimeTracks[]> => {
  const response = await api.get("/timetracks", { params: filters });
  return response.data;
};
