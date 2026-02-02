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
import { useMemo, useState } from "react";
import { AuthGuard } from "@/components/auth/auth-guard";
import DashboardSkeleton from "@/components/dashboard-skeleton";
import { timeTracksColumnsProductivity } from "@/components/data-table/columns/time-tracks-productivity";
import { DataTable } from "@/components/data-table/data-table";
import { DashboardFilters } from "@/components/layout/dashboard-filters";
import { Header } from "@/components/layout/header";
import { AppSidebar } from "@/components/layout/sidebar";
import { HeaderSkeleton } from "@/components/skeleton-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useFilters } from "@/contexts/filters-context";
import { useDashboard } from "@/hooks/dashboard/use-dashboard";
import type { ProductivityRow } from "@/types/time-tracking";

export default function Page() {
  const { sourceSystem, dateRange } = useFilters();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "productivity", desc: true },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });

  const startTime = dateRange?.from
    ? dateRange.from.toISOString()
    : startOfMonth(new Date()).toISOString();
  const endTime = dateRange?.to
    ? dateRange.to.toISOString()
    : startOfDay(new Date()).toISOString();

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
      pagination,
    },
    onPaginationChange: setPagination,
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
