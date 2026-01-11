"use client";

import { AppSidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardPersonalCards from "@/components/dashboard-personal-cards";
import { UserDailyHoursBarChart } from "@/components/charts/user-hours-bar-chart";
import { DailyHours, SourceSystem } from "@/types/api";
import ProductivityPerDayLineChart from "@/components/charts/productivity-per-day-line-chart";
import { DataTable } from "@/components/data-table/data-table";
import { timeTracksColumnsPersonal } from "@/components/data-table/columns/time-tracks-personal";
import { TimeTrackingPersonalRow } from "@/types/time-tracking";
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
import { useEffect, useMemo, useState } from "react";
import { DashboardFilters } from "@/components/layout/dashboard-filters";

export default function Page() {
  const { sourceSystem, dateRange } = useFilters();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const data: DailyHours[] = [
    { date: "2024-06-01", available: 5, worked: 4 },
    { date: "2024-06-02", available: 6, worked: 5 },
    { date: "2024-06-03", available: 4, worked: 3 },
    { date: "2024-06-04", available: 7, worked: 6 },
    { date: "2024-06-05", available: 5, worked: 5 },
    { date: "2024-06-06", available: 6, worked: 4 },
    { date: "2024-06-07", available: 5, worked: 5 },
  ];

  const productivityData = [
    { date: "2024-06-01", productivity: 80 },
    { date: "2024-06-02", productivity: 83 },
    { date: "2024-06-03", productivity: 85 },
    { date: "2024-06-04", productivity: 90 },
    { date: "2024-06-05", productivity: 88 },
  ];

  const dataTableData: TimeTrackingPersonalRow[] = [
    {
      startTime: "2024-06-01T09:00:00.000Z",
      project: "Projeto A",
      task: "Tarefa 1",
      duration: 120,
      status: "1",
      sourceSystem: "Azure DevOps",
    },
    {
      startTime: "2024-06-02T10:00:00.000Z",
      project: "Projeto B",
      task: "Tarefa 2",
      duration: 180,
      status: "2",
      sourceSystem: "Azure DevOps",
    },
    {
      startTime: "2024-06-03T11:00:00.000Z",
      project: "Projeto C",
      task: "Tarefa 3",
      duration: 240,
      status: "3",
      sourceSystem: "GLPI",
    },
    {
      startTime: "2026-01-03T12:00:00.000Z",
      project: "Projeto D",
      task: "Tarefa 4",
      duration: 300,
      status: "3",
      sourceSystem: "Azure DevOps",
    },
    {
      startTime: "2026-01-02T13:00:00.000Z",
      project: "Projeto E",
      task: "Tarefa 5",
      duration: 360,
      status: "1",
      sourceSystem: "GLPI",
    },
    {
      startTime: "2026-01-02T14:00:00.000Z",
      project: "Projeto F",
      task: "Tarefa 6",
      duration: 420,
      status: "2",
      sourceSystem: "GLPI",
    },
  ];

  const table = useReactTable({
    data: dataTableData,
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

  useEffect(() => {
    const newFilters: ColumnFiltersState = [];

    if (sourceSystem) {
      newFilters.push({
        id: "sourceSystem",
        value: sourceSystem,
      });
    }

    if (dateRange?.from || dateRange?.to) {
      newFilters.push({
        id: "startTime",
        value: dateRange,
      });
    }

    table.setSorting([{ id: "startTime", desc: true }]);

    table.setColumnFilters(newFilters);
  }, [sourceSystem, dateRange, table]);

  const sourceSystemOptions: SourceSystem[] = useMemo(() => {
    return Array.from(
      new Set(dataTableData.map((item) => item.sourceSystem))
    ).sort();
  }, [dataTableData]);

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
          <div className="@container/main flex flex-1 flex-col gap-4">
            <div className="border-b bg-background">
              <div className="px-4 py-3 lg:px-6">
                <DashboardFilters
                  sourceSystems={sourceSystemOptions}
                  showSourceSystem
                  showDateRange
                />
              </div>
            </div>
            <div className="mt-2 md:mt-4 px-4 lg:px-6">
              <DashboardPersonalCards />
            </div>
            <div className="grid *:container/main grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2">
              <UserDailyHoursBarChart data={data} />
              <ProductivityPerDayLineChart data={productivityData} />
            </div>
            <div className="px-4 lg:px-6">
              <DataTable
                table={table}
                key={`table-${JSON.stringify(columnFilters)}`}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
