"use client";

import { AuthGuard } from "@/components/auth/auth-guard";
import { allTasksColumns } from "@/components/data-table/columns/all-tasks.columns";
import { DataTable } from "@/components/data-table/data-table";
import { DashboardFilters } from "@/components/layout/dashboard-filters";
import { Header } from "@/components/layout/header";
import { AppSidebar } from "@/components/layout/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useFilters } from "@/contexts/filters-context";
import { useFilterOptions } from "@/hooks/use-filter-options";
import { useTasksWithDelivery } from "@/hooks/use-delivery-tasks";
import { ColumnFiltersState, PaginationState, SortingState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import type { TaskRow } from "@/types/tasks-list";

export default function Page() {
  const { sourceSystem, person, status } = useFilters();
  const { data: filterOptions, isLoading: isLoadingFilterOptions } = useFilterOptions();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 11,
  });

  // Buscamos os dados passando o filtro de pessoa (incluindo "Sem Atribuição")
  const { data: activeTasksData, isLoading } = useTasksWithDelivery({
    person: person === "All" ? undefined : person,
    sourceSystem: sourceSystem === "All" ? undefined : sourceSystem,
  });

  // 1. Adiciona "Sem Atribuição" nas opções do dropdown de filtros
  const personOptions = useMemo(() => {
    const options = filterOptions?.users ?? [];
    if (options.length > 0 && !options.includes("Sem Atribuição")) {
      return [...options, "Sem Atribuição"];
    }
    return options;
  }, [filterOptions]);

  // 2. Mapeia os dados tratando valores nulos para exibir "Sem Atribuição" na célula
  const tableData = useMemo(() => {
    if (!activeTasksData) return [];
    return activeTasksData.map((task) => ({
      person: task.person || "Sem Atribuição",
      taskName: task.task,
      environment: task.sourceSystem,
      deliveryDate: task.deliveryDate ? new Date(task.deliveryDate) : null,
      status: task.status,
    })) as TaskRow[];
  }, [activeTasksData]);

  const statusOptions = useMemo(() => {
    if (!activeTasksData) return [];
    const uniqueStatus = Array.from(
      new Set(activeTasksData.map((task) => task.status).filter(Boolean)),
    );
    return uniqueStatus;
  }, [activeTasksData]);

  const table = useReactTable({
    data: tableData,
    columns: allTasksColumns,
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

  // 3. Sincroniza o filtro global com o filtro interno da tabela
  useEffect(() => {
    const newFilters: ColumnFiltersState = [];

    if (person && person !== "All") {
      newFilters.push({
        id: "person",
        value: person,
      });
    }

    if (status && status !== "All") {
      newFilters.push({
        id: "status",
        value: status,
      });
    }

    table.setPageIndex(0);
    table.setColumnFilters(newFilters);
  }, [person, status, table]);

  if (isLoading || isLoadingFilterOptions) {
    return (
      <AuthGuard>
        <SidebarProvider>
          <AppSidebar variant="inset" />
          <SidebarInset>
            <Header title="Todas Tarefas" isLoading={isLoading} />
            <div className="flex items-center justify-center py-10">
              <span>Carregando dados...</span>
            </div>
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
            title="Todas Tarefas"
            isLoading={isLoading}
          />
          <div className="@container/main flex flex-1 flex-col">
            <div className="border-b bg-background">
              <div className="px-4 py-3 lg:px-6">
                <DashboardFilters
                  persons={personOptions}
                  statuses={statusOptions}
                  showPerson
                  showStatus
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-6 px-4 py-6 lg:px-6">
              <DataTable
                table={table}
                key={`table-${JSON.stringify(columnFilters)}-${JSON.stringify(pagination)}`}
              />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}