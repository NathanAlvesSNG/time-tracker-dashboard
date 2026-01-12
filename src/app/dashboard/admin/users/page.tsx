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
import ProductivityPerDayLineChart from "@/components/charts/productivity-per-day-line-chart";
import { UserDailyHoursBarChart } from "@/components/charts/user-hours-bar-chart";
import DashboardPersonalCards from "@/components/dashboard-personal-cards";
import { timeTracksColumnsPersonal } from "@/components/data-table/columns/time-tracks-personal";
import { DataTable } from "@/components/data-table/data-table";
import { DashboardFilters } from "@/components/layout/dashboard-filters";
import { Header } from "@/components/layout/header";
import { AppSidebar } from "@/components/layout/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useFilters } from "@/contexts/filters-context";
import type { SourceSystem } from "@/types/api";
import type { TimeTrackingPersonalRow } from "@/types/time-tracking";
import dataTimeTrack from "../dataTimetrack.json";

import { dailyHoursData, productivityData } from "../mockData";

export default function Page() {
  const { sourceSystem, dateRange, person, setPerson } = useFilters();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const typedTimetrackData = dataTimeTrack as TimeTrackingPersonalRow[];

  const tableTimetrack = useReactTable({
    data: typedTimetrackData,
    columns: timeTracksColumnsPersonal,
    state: {
      columnFilters,
      sorting,
    },
    initialState: {
      columnVisibility: {
        person: false,
      },
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    if (typedTimetrackData.length === 0) {
      return;
    }
    setPerson(typedTimetrackData[0].person);
  }, []);

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

    if (dateRange?.from || dateRange?.to) {
      newFilters.push({
        id: "startTime",
        value: dateRange,
      });
    }

    tableTimetrack.setSorting([{ id: "startTime", desc: true }]);

    tableTimetrack.setColumnFilters(newFilters);
  }, [sourceSystem, dateRange, person, tableTimetrack]);

  const sourceSystemOptions: SourceSystem[] = useMemo(() => {
    return Array.from(
      new Set(typedTimetrackData.map((item) => item.sourceSystem)),
    ).sort();
  }, [typedTimetrackData]);

  const personOptions: string[] = useMemo(() => {
    return Array.from(
      new Set(typedTimetrackData.map((item) => item.person)),
    ).sort();
  }, [typedTimetrackData]);

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
                  persons={personOptions}
                  sourceSystems={sourceSystemOptions}
                  showDateRange
                  showPerson
                  showSourceSystem
                  hasAll={false}
                />
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <DashboardPersonalCards />

              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <UserDailyHoursBarChart data={dailyHoursData} />
                <ProductivityPerDayLineChart data={productivityData} />
              </div>

              <DataTable
                table={tableTimetrack}
                key={`table-${JSON.stringify(columnFilters)}`}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
