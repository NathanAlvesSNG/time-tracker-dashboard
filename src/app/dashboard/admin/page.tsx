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
import { SourceSystem } from "@/types/api";
import { DashboardFilters } from "@/components/layout/dashboard-filters";
import DashboardPersonalCards from "@/components/dashboard-personal-cards";

export default function Page() {
  const { sourceSystem, dateRange, project } = useFilters();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const typedTimetrackData = dataTimeTrack as TimeTrackingPersonalRow[];
  const typedProductivityData = dataProductivity as ProductivityRow[];

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
          <div className="@container/main flex flex-1 flex-col gap-4">
            <div className="border-b bg-background">
              <div className="px-4 py-3 lg:px-6">
                <DashboardFilters
                  sourceSystems={sourceSystemOptions}
                  projects={projectOptions}
                  persons={personOptions}
                  showSourceSystem
                  showDateRange
                  showPerson
                  showProject
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-6">
              <DashboardPersonalCards />
            </div>
            // TODO: Dividir em três seções
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
