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
import { useEffect, useState } from "react";
import { timeTracksColumnsProductivity } from "@/components/data-table/columns/time-tracks-productivity";
import { DataTable } from "@/components/data-table/data-table";
import { DashboardFilters } from "@/components/layout/dashboard-filters";
import { Header } from "@/components/layout/header";
import { AppSidebar } from "@/components/layout/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useFilters } from "@/contexts/filters-context";
import type { ProductivityRow } from "@/types/time-tracking";
import dataProductivity from "../dataProductivity.json";

export default function Page() {
  const { sourceSystem, dateRange } = useFilters();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const typedProductivityData = dataProductivity as ProductivityRow[];

  const tableProductivity = useReactTable({
    data: typedProductivityData,
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

  useEffect(() => {
    const newFilters: ColumnFiltersState = [];

    if (dateRange?.from || dateRange?.to) {
      newFilters.push({
        id: "startTime",
        value: dateRange,
      });
    }

    tableProductivity.setSorting([{ id: "startTime", desc: true }]);

    tableProductivity.setColumnFilters(newFilters);
  }, [sourceSystem, dateRange, tableProductivity]);

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
        <Header title="Dashboard Administrativo - Produtividade Geral" />
        <div className="flex flex-1 flex-col pb-5">
          <div className="@container/main flex flex-1 flex-col gap-4">
            <div className="border-b bg-background">
              <div className="px-4 py-3 lg:px-6">
                <DashboardFilters showDateRange />
              </div>
            </div>
            <div className="px-4 lg:px-6">
              <DataTable table={tableProductivity} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
