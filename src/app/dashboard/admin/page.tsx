"use client";

import { AppSidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useFilters } from "@/contexts/filters-context";
import {
  SortingState,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

import dataProductivity from "./dataProductivity.json";
import dataTimeTrack from "./dataTimetrack.json";
import { timeTracksColumnsPersonal } from "@/components/data-table/columns/time-tracks-personal";
import {
  ProductivityRow,
  TimeTrackingPersonalRow,
} from "@/types/time-tracking";
import { timeTracksColumnsProductivity } from "@/components/data-table/columns/time-tracks-productivity";
import {
  SourceSystem,
  TotalHoursPerPersonPerProjectChart,
  WorkedHoursChart,
  WorkedHoursPerPerson,
  WorkedHoursPerProjectChart,
} from "@/types/api";
import { DashboardFilters } from "@/components/layout/dashboard-filters";
import DashboardPersonalCards from "@/components/dashboard-personal-cards";
import { Separator } from "@/components/ui/separator";
import WorkedHoursPerDayLineChart from "@/components/charts/worked-hours-per-day-line-chart";
import DashboardSection from "@/components/dashboard-section";
import { DataTable } from "@/components/data-table/data-table";
import { WorkedHoursPerProjectBarChart } from "@/components/charts/worked-hours-per-project-bar-chart";
import TotalHoursPerPersonPerProjectBarChart from "@/components/charts/total-hours-per-person-per-project-bar-chart";
import WorkedHoursPerPersonBarChart from "@/components/charts/worked-hours-per-person";

export default function Page() {
  const { sourceSystem, dateRange, project } = useFilters();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const typedTimetrackData = dataTimeTrack as TimeTrackingPersonalRow[];
  const typedProductivityData = dataProductivity as ProductivityRow[];

  const workedHoursChartData: WorkedHoursChart[] = [
    { date: "2023-01-01", workedHours: 8 },
    { date: "2023-01-02", workedHours: 6 },
    { date: "2023-01-03", workedHours: 5 },
    { date: "2023-01-04", workedHours: 4 },
    { date: "2023-01-05", workedHours: 3 },
    { date: "2023-01-06", workedHours: 2 },
    { date: "2023-01-07", workedHours: 1 },
  ];

  const workedHoursPerProjectChartData: WorkedHoursPerProjectChart[] = [
    { project: "Projeto 1", workedHours: 8 },
    { project: "Projeto 2", workedHours: 6 },
    { project: "Projeto 3", workedHours: 5 },
    { project: "Projeto 4", workedHours: 4 },
    { project: "Projeto 5", workedHours: 3 },
    { project: "Projeto 6", workedHours: 2 },
    { project: "Projeto 7", workedHours: 1 },
  ];

  const totalHoursPerPersonPerProjectData = [
    {
      person: "Gabriel",
      project: "Projeto A",
      workedHours: 32,
    },
    {
      person: "Gabriel",
      project: "Projeto B",
      workedHours: 18,
    },
    {
      person: "Gabriel",
      project: "Projeto C",
      workedHours: 10,
    },

    {
      person: "Ana",
      project: "Projeto A",
      workedHours: 24,
    },
    {
      person: "Ana",
      project: "Projeto B",
      workedHours: 30,
    },
    {
      person: "Ana",
      project: "Projeto C",
      workedHours: 14,
    },

    {
      person: "Lucas",
      project: "Projeto A",
      workedHours: 40,
    },
    {
      person: "Lucas",
      project: "Projeto B",
      workedHours: 22,
    },
    {
      person: "Lucas",
      project: "Projeto C",
      workedHours: 16,
    },
  ] satisfies TotalHoursPerPersonPerProjectChart[];

  const workedHoursPerPersonBarChartData: WorkedHoursPerPerson[] = [
    { person: "Gabriel", workedHours: 42 },
    { person: "Ana", workedHours: 36 },
    { person: "Lucas", workedHours: 28 },
    { person: "Mariana", workedHours: 31 },
  ];

  const tableTimetrack = useReactTable({
    data: typedTimetrackData,
    columns: timeTracksColumnsPersonal,
    state: {
      columnFilters,
      sorting,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const tableProductivity = useReactTable({
    data: typedProductivityData,
    columns: timeTracksColumnsProductivity,
    state: {
      columnFilters,
      sorting,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // useEffect(() => {
  //   const newFilters: ColumnFiltersState = [];

  //   if (sourceSystem) {
  //     newFilters.push({
  //       id: "sourceSystem",
  //       value: sourceSystem,
  //     });
  //   }

  //   if (dateRange?.from || dateRange?.to) {
  //     newFilters.push({
  //       id: "startTime",
  //       value: dateRange,
  //     });
  //   }

  //   table.setSorting([{ id: "startTime", desc: true }]);

  //   table.setColumnFilters(newFilters);
  // }, [sourceSystem, dateRange, table]);

  const sourceSystemOptions: SourceSystem[] = useMemo(() => {
    return Array.from(
      new Set(typedTimetrackData.map((item) => item.sourceSystem))
    ).sort();
  }, [typedTimetrackData]);

  const projectOptions: string[] = useMemo(() => {
    return Array.from(
      new Set(typedTimetrackData.map((item) => item.project))
    ).sort();
  }, [typedTimetrackData]);

  const personOptions: string[] = useMemo(() => {
    return Array.from(
      new Set(typedProductivityData.map((item) => item.person))
    ).sort();
  }, [typedProductivityData]);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 64)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <Header title="Dashboard Geral - Time Tracker" />
        <div className="flex flex-1 flex-col pb-5">
          <div className="@container/main flex flex-1 flex-col gap-8">
            <DashboardSection
              title="Geral"
              filters={
                <DashboardFilters
                  projects={projectOptions}
                  persons={personOptions}
                  showDateRange
                  showPerson
                  showProject
                />
              }
            >
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
                <WorkedHoursPerDayLineChart data={workedHoursChartData} />
                <WorkedHoursPerPersonBarChart
                  data={workedHoursPerPersonBarChartData}
                />
                <TotalHoursPerPersonPerProjectBarChart
                  data={totalHoursPerPersonPerProjectData}
                />
                <WorkedHoursPerProjectBarChart
                  data={workedHoursPerProjectChartData}
                />
              </div>
            </DashboardSection>
            <DashboardSection
              title="Produtividade Geral"
              filters={<DashboardFilters showDateRange />}
            >
              <DataTable table={tableProductivity} />
            </DashboardSection>
            <DashboardSection
              title="Produtividade Individual"
              filters={
                <DashboardFilters
                  persons={personOptions}
                  sourceSystems={sourceSystemOptions}
                  showDateRange
                  showPerson
                  showSourceSystem
                  hasAll={false}
                />
              }
            >
              <div className="flex flex-col gap-6">
                <DashboardPersonalCards />

                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  {/* <MultipleBarChart /> */}
                  {/* <LineChart /> */}
                </div>

                <DataTable table={tableTimetrack} />
              </div>
            </DashboardSection>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
