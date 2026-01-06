import { create } from "zustand";

type Filters = {
  startDate: string | null;
  endDate: string | null;
  userEmail: string | null;
  projectName: string | null;
  sourceSystem: string | null;
  setFilters: (filters: Partial<Filters>) => void;
};

export const useDashboardFilters = create<Filters>((set) => ({
  startDate: null,
  endDate: null,
  userEmail: null,
  projectName: null,
  sourceSystem: null,
  setFilters: (filters) => set(filters),
}));
