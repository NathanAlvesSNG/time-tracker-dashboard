"use client";

import {
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { DashboardGeneralCards } from "@/components/dashboard-general-cards";
import { timeTracksColumns } from "@/components/data-table/columns/time-tracks.columns";
import { DataTable } from "@/components/data-table/data-table";
import { DashboardFilters } from "@/components/layout/dashboard-filters";
import { Header } from "@/components/layout/header";
import { AppSidebar } from "@/components/layout/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useFilters } from "@/contexts/filters-context";
import type { SourceSystem } from "@/types/api";
import type { TimeTrackingRow } from "@/types/time-tracking";

export default function Page() {
  const { sourceSystem, person } = useFilters();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const apiMock: TimeTrackingRow[] = [
    {
      person: "Nathan",
      project: "Portal BI",
      task: "Dashboard Geral",
      startTime: "2024-06-10T08:00:00Z",
      sourceSystem: "Azure DevOps",
      duration: 3600,
    },
    {
      person: "Isabela",
      project: "App Mobile",
      task: "Dashboard Geral",
      startTime: "2026-01-05T10:30:00Z",
      sourceSystem: "GLPI",
      duration: 5400,
    },
  ];

  const table = useReactTable({
    data: apiMock,
    columns: timeTracksColumns,
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

    if (person) {
      newFilters.push({
        id: "person",
        value: person,
      });
    }
    table.setColumnFilters(newFilters);
  }, [sourceSystem, person, table]);

  const sourceSystemOptions: SourceSystem[] = useMemo(() => {
    return Array.from(new Set(apiMock.map((item) => item.sourceSystem))).sort();
  }, []);

  const personOptions: string[] = useMemo(() => {
    return Array.from(new Set(apiMock.map((item) => item.person))).sort();
  }, []);

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
        <div className="@container/main flex flex-1 flex-col">
          <div className="border-b bg-background">
            <div className="px-4 py-3 lg:px-6">
              <DashboardFilters
                sourceSystems={sourceSystemOptions}
                persons={personOptions}
                showSourceSystem
                showPerson
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-6 px-4 py-6 lg:px-6">
            <DashboardGeneralCards />
            <DataTable
              key={`table-${JSON.stringify(columnFilters)}`}
              table={table}
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
