"use client";

import { useFilters } from "@/contexts/filters-context";
import type { SourceSystem } from "@/types/api";
import { DateRangeFilter } from "../filters/date-range-filter";
import { PersonFilter } from "../filters/person-filter";
import { ProjectFilter } from "../filters/project-filter";
import { SourceSystemFilter } from "../filters/source-system-filter";
import { Separator } from "../ui/separator";

type DashboardFiltersProps = {
  sourceSystems?: SourceSystem[];
  persons?: string[];
  projects?: string[];

  showDateRange?: boolean;
  showSourceSystem?: boolean;
  showPerson?: boolean;
  showProject?: boolean;

  hasAll?: boolean;

  defaultValue?: DateRangeFilter;
};

export function DashboardFilters({
  sourceSystems = [],
  persons = [],
  projects = [],

  showDateRange = false,
  showSourceSystem = false,
  showPerson = false,
  showProject = false,

  hasAll = true,

  defaultValue,
}: DashboardFiltersProps) {
  const { sourceSystem } = useFilters();

  const filters = [
    showDateRange && <DateRangeFilter defaultValue={defaultValue} key="date" />,
    showSourceSystem && sourceSystems.length > 0 && (
      <SourceSystemFilter key="source" options={sourceSystems} />
    ),
    showPerson && persons.length > 0 && (
      <PersonFilter key="person" options={persons} hasAll={hasAll} />
    ),
    showProject && !(sourceSystem === "IZIT") && projects.length > 0 && (
      <ProjectFilter key="project" options={projects} />
    ),
  ].filter(Boolean);

  return (
    <section
      aria-label="Filtros do dashboard"
      className="flex flex-col gap-6 px-4 lg:flex-row lg:px-6"
    >
      {filters.map((filter, index) => (
        <div
          key={index}
          className="flex flex-col gap-6 lg:flex-row lg:items-stretch"
        >
          {index > 0 && (
            <>
              <Separator className="lg:hidden" />

              <Separator orientation="vertical" className="hidden lg:block" />
            </>
          )}

          <div className="flex flex-col">{filter}</div>
        </div>
      ))}
    </section>
  );
}
