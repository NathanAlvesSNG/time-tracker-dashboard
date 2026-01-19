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
import { useMemo, useState } from "react";
import { timeTracksColumnsProductivity } from "@/components/data-table/columns/time-tracks-productivity";
import { DataTable } from "@/components/data-table/data-table";
import { DashboardFilters } from "@/components/layout/dashboard-filters";
import { Header } from "@/components/layout/header";
import { AppSidebar } from "@/components/layout/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useFilters } from "@/contexts/filters-context";
import type { ProductivityRow } from "@/types/time-tracking";
import { AuthGuard } from "@/components/auth/auth-guard";
import { startOfMonth, subMonths } from "date-fns";
import { useDashboard } from "@/hooks/dashboard/use-dashboard";
import DashboardSkeleton from "@/components/dashboard-skeleton";
import { HeaderSkeleton } from "@/components/skeleton-header";

export default function Page() {
  const { sourceSystem, dateRange } = useFilters();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const startTime = dateRange?.from
    ? dateRange.from.toISOString()
    : startOfMonth(subMonths(new Date(), 1)).toISOString();

  const endTime = dateRange?.to
    ? dateRange.to.toISOString()
    : startOfMonth(new Date()).toISOString();

  const {
    productivity: { allUsersProductivity, isLoading },
  } = useDashboard(
    { sourceSystem, startTime, endTime },
    {
      loadProductivity: true,
      loadOverview: false,
      loadPersonal: false,
      loadSla: false,
      loadWorkedHours: false,
    },
  );

  const tableData = useMemo(
    () => allUsersProductivity || [],
    [allUsersProductivity],
  );

  const table = useReactTable({
    data: tableData as ProductivityRow[],
    columns: timeTracksColumnsProductivity,
    state: {
      columnFilters,
      sorting,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) {
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
          <Header title="Dashboard Administrativo - Produtividade Geral" />
          <div className="flex flex-1 flex-col pb-5">
            <div className="@container/main flex flex-1 flex-col gap-4">
              <div className="border-b bg-background">
                <div className="px-4 py-3 lg:px-6">
                  <DashboardFilters showDateRange />
                </div>
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
    </AuthGuard>
  );
}
