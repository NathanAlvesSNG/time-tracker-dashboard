"use client";

import { createContext, useContext, useState } from "react";
import type { DateRangeFilter } from "@/components/filters/date-range-filter";
import type { SourceSystem } from "@/types/api";
import { startOfMonth, startOfDay } from "date-fns";

type FiltersContextType = {
  sourceSystem?: SourceSystem;
  setSourceSystem: (value?: SourceSystem) => void;
  person?: string;
  setPerson: (value?: string) => void;
  project?: string;
  setProject: (value?: string) => void;
  dateRange?: DateRangeFilter;
  setDateRange: (value: DateRangeFilter) => void;
};

const defaultDateRange: DateRangeFilter = {
  from: startOfMonth(new Date()),
  to: startOfDay(new Date()),
};

const FiltersContext = createContext<FiltersContextType | null>(null);

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [sourceSystem, setSourceSystem] = useState<SourceSystem | undefined>(
    undefined,
  );
  const [person, setPerson] = useState<string | undefined>(undefined);
  const [project, setProject] = useState<string | undefined>(undefined);
  const [dateRange, setDateRange] = useState<DateRangeFilter>(defaultDateRange);

  return (
    <FiltersContext.Provider
      value={{
        sourceSystem,
        setSourceSystem,
        person,
        setPerson,
        project,
        setProject,
        dateRange,
        setDateRange,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error("useFilters must be used within FiltersProvider");
  }
  return context;
}
