"use client";

import { DateRangeFilter } from "../filters/date-range-filter";
import { SourceSystemFilter } from "../filters/source-system-filter";
import { PersonFilter } from "../filters/person-filter";
import type { SourceSystem } from "@/types/api";
import { Separator } from "../ui/separator";
import { ProjectFilter } from "../filters/project-filter";

type DashboardFiltersProps = {
  sourceSystems?: SourceSystem[];
  persons?: string[];
  projects?: string[];

  showDateRange?: boolean;
  showSourceSystem?: boolean;
  showPerson?: boolean;
  showProject?: boolean;

  hasAll?: boolean;
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
}: DashboardFiltersProps) {
  const filters = [
    showDateRange && <DateRangeFilter key="date" />,
    showSourceSystem && sourceSystems.length > 0 && (
      <SourceSystemFilter key="source" options={sourceSystems} />
    ),
    showPerson && persons.length > 0 && (
      <PersonFilter key="person" options={persons} hasAll={hasAll} />
    ),
    showProject && projects.length > 0 && (
      <ProjectFilter key="project" options={projects} />
    ),
  ].filter(Boolean);

  return (
    <section
      aria-label="Filtros do dashboard"
      className="flex flex-wrap items-stretch gap-6 px-4 lg:px-6"
    >
      {filters.map((filter, index) => (
        <div key={index} className="flex items-stretch gap-6">
          {index > 0 && (
            <Separator orientation="vertical" className="bg-border" />
          )}

          <div className="flex flex-col">{filter}</div>
        </div>
      ))}
    </section>
  );
}
