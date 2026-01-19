"use client";

import {
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
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
import { AuthGuard } from "@/components/auth/auth-guard";
import DashboardSkeleton from "@/components/dashboard-skeleton";
import { HeaderSkeleton } from "@/components/skeleton-header";
import { startOfMonth, subMonths } from "date-fns";
import { useDashboard } from "@/hooks/dashboard/use-dashboard";
import { useFilterOptions } from "@/hooks/use-filter-options";

export default function Page() {
  const { sourceSystem, person, dateRange } = useFilters();
  const { data: filterOptions, isLoading: isLoadingFilterOptions } =
    useFilterOptions();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const startTime = dateRange?.from
    ? dateRange.from.toISOString()
    : startOfMonth(subMonths(new Date(), 1)).toISOString();

  const endTime = dateRange?.to
    ? dateRange.to.toISOString()
    : startOfMonth(new Date()).toISOString();

  const {
    overview: { active: data },
    isLoading,
  } = useDashboard(
    {
      startTime,
      endTime,
      person,
      sourceSystem,
    },
    {
      loadOverview: true,
      loadProductivity: false,
      loadPersonal: false,
      loadSla: false,
      loadWorkedHours: false,
    },
  );

  const personOptions = useMemo(
    () => filterOptions?.users ?? [],
    [filterOptions],
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

  const tableData = useMemo(() => data || [], [data]);

  const table = useReactTable({
    data: tableData,
    columns: timeTracksColumns,
    state: {
      columnFilters,
      sorting,
      pagination,
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
    if (!tableData.length) return;

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

    table.setPageIndex(0);
    table.setColumnFilters(newFilters);
  }, [sourceSystem, person]);

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
            title="Dashboard Geral - Time Tracker"
            isLoading={isLoading}
          />
          <div className="@container/main flex flex-1 flex-col">
            {data?.length != 0 && (
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
            )}
            <div className="flex flex-1 flex-col gap-6 px-4 py-6 lg:px-6">
              {isLoading ? (
                <div className="flex items-center justify-center py-10">
                  <span>Carregando dados...</span>
                </div>
              ) : (
                <>
                  <DashboardGeneralCards
                    data={table.getFilteredRowModel().rows}
                  />
                  <DataTable
                    table={table}
                    key={`table-${JSON.stringify(
                      columnFilters,
                    )} - ${JSON.stringify(pagination)}`}
                  />
                </>
              )}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}
