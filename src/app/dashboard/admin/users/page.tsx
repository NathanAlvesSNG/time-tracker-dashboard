"use client";

import {
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { startOfDay, startOfMonth } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { AuthGuard } from "@/components/auth/auth-guard";
import ProductivityPerDayLineChart from "@/components/charts/productivity-per-day-line-chart";
import { UserDailyHoursBarChart } from "@/components/charts/user-hours-bar-chart";
import DashboardPersonalCards from "@/components/dashboard-personal-cards";
import DashboardSkeleton from "@/components/dashboard-skeleton";
import { timeTracksColumnsPersonal } from "@/components/data-table/columns/time-tracks-personal";
import { DataTable } from "@/components/data-table/data-table";
import { DashboardFilters } from "@/components/layout/dashboard-filters";
import { Header } from "@/components/layout/header";
import { AppSidebar } from "@/components/layout/sidebar";
import { HeaderSkeleton } from "@/components/skeleton-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useFilters } from "@/contexts/filters-context";
import { useDashboard } from "@/hooks/dashboard/use-dashboard";
import { useFilterOptions } from "@/hooks/use-filter-options";

export default function Page() {
  const { sourceSystem, dateRange, person, setPerson } = useFilters();
  const { data: filterOptions, isLoading: filterOptionsLoading } =
    useFilterOptions();

  const startTime = dateRange?.from
    ? dateRange.from.toISOString()
    : startOfMonth(new Date()).toISOString();
  const endTime = dateRange?.to
    ? dateRange.to.toISOString()
    : startOfDay(new Date()).toISOString();

  const sourceSystemOptions = useMemo(() => {
    if (!filterOptions?.services) return [];

    return Array.from(
      new Set(
        filterOptions.services.map((s) =>
          s.sourceSystem === "Azure DevOps" ? "Azure DevOps" : "IZIT",
        ),
      ),
    ).sort();
  }, [filterOptions]);

  const personOptions = useMemo(
    () => filterOptions?.users ?? [],
    [filterOptions],
  );

  const resolvedPerson = useMemo(() => {
    if (person) return person;
    if (personOptions.length > 0) return personOptions[0];
    return undefined;
  }, [person, personOptions]);

  useEffect(() => {
    if (!person && resolvedPerson) {
      setPerson(resolvedPerson);
    }
  }, [person, resolvedPerson, setPerson]);

  const {
    personal: { userTasks: timeTrackData, score: userScore },
    productivity: { productivity, daily: dailyProductivity },
    isLoading,
  } = useDashboard(
    {
      sourceSystem,
      startTime,
      endTime,
      person: resolvedPerson,
    },
    {
      loadPersonal: true,
      loadProductivity: true,
      loadWorkedHours: false,
      loadSla: false,
      loadOverview: false,
    },
    true,
  );

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const tableData = useMemo(() => timeTrackData || [], [timeTrackData]);

  const tableTimetrack = useReactTable({
    data: tableData,
    columns: timeTracksColumnsPersonal,
    state: {
      columnFilters,
      sorting,
      pagination,
    },
    initialState: {
      columnVisibility: {
        person: false,
      },
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    const newFilters: ColumnFiltersState = [];

    if (sourceSystem && sourceSystem !== "All") {
      newFilters.push({
        id: "sourceSystem",
        value: sourceSystem,
      });
    }

    if (dateRange?.from && dateRange?.to) {
      newFilters.push({
        id: "startTime",
        value: {
          from: dateRange.from,
          to: dateRange.to,
        },
      });
    }

    if (resolvedPerson) {
      newFilters.push({
        id: "person",
        value: resolvedPerson,
      });
    }

    tableTimetrack.setPageIndex(0);
    tableTimetrack.setColumnFilters(newFilters);
  }, [sourceSystem, dateRange, resolvedPerson]);

  if (isLoading || filterOptionsLoading || !resolvedPerson) {
    return (
      <AuthGuard>
        <SidebarProvider>
          <AppSidebar variant="inset" />
          <SidebarInset>
            <HeaderSkeleton />
            <DashboardSkeleton />
          </SidebarInset>
        </SidebarProvider>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard adminOnly>
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

              <div className="mt-2 md:mt-4 px-4 lg:px-6">
                <DashboardPersonalCards
                  productivity={productivity?.productivity || 0}
                  availableHours={productivity?.availableHours || 0}
                  workedHours={productivity?.workedHours || 0}
                  score={userScore?.score || 0}
                  label={userScore?.label || ""}
                />
              </div>

              <div className="grid *:container/main grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2">
                <UserDailyHoursBarChart data={dailyProductivity || []} />
                <ProductivityPerDayLineChart data={dailyProductivity || []} />
              </div>

              <div className="px-4 lg:px-6">
                <DataTable
                  table={tableTimetrack}
                  key={`table-${JSON.stringify(columnFilters)}=${JSON.stringify(pagination)}`}
                />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}
