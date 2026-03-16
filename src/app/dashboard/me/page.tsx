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
import { startOfWeek, format, endOfDay } from "date-fns";
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
  const { sourceSystem, dateRange } = useFilters();
  const { data: filterOptions, isLoading: isLoadingFilterOptions } =
    useFilterOptions();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const defaultFrom = startOfWeek(new Date(), { weekStartsOn: 1 });
  const defaultTo = new Date();

  const startTime = dateRange?.from
    ? dateRange.from.toISOString()
    : defaultFrom.toISOString();

  const endTime = dateRange?.to
    ? dateRange.to.toISOString()
    : defaultTo.toISOString();

  const {
    personal: { userTasks, score: userScore },
    productivity: { productivity: productivityData, daily: dailyProductivity },
    isLoading,
  } = useDashboard(
    { sourceSystem, startTime, endTime },
    {
      loadPersonal: true,
      loadProductivity: true,
      loadOverview: false,
      loadSla: false,
      loadWorkedHours: false,
    },
  );

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

  const tableData = useMemo(() => userTasks || [], [userTasks]);

  const table = useReactTable({
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
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
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

    table.setPageIndex(0);
    table.resetColumnFilters();
    table.setColumnFilters(newFilters);
  }, [sourceSystem, dateRange]);

  if (isLoading || isLoadingFilterOptions) {
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
    <AuthGuard>
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
          <Header
            title="Dashboard Individual - Produtividade"
            isLoading={isLoading}
          />
          <div className="flex flex-1 flex-col pb-5">
            <div className="@container/main flex flex-1 flex-col gap-4">
              <div className="border-b bg-background">
                <div className="px-4 py-3 lg:px-6">
                  <DashboardFilters
                    sourceSystems={sourceSystemOptions}
                    showSourceSystem
                    showDateRange
                    defaultValue={{
                      from: defaultFrom,
                      to: defaultTo,
                    }}
                  />
                </div>
              </div>
              <div className="mt-2 md:mt-4 px-4 lg:px-6">
                <DashboardPersonalCards
                  productivity={productivityData?.productivity || 0}
                  availableHours={productivityData?.availableHours || 0}
                  workedHours={productivityData?.workedHours || 0}
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
                  table={table}
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
