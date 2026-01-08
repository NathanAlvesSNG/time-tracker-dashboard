"use client";

import { Table } from "@tanstack/react-table";
import { SourceSystemFilter } from "@/components/filters/source-system-filter";

type Props<TData> = {
  table: Table<TData>;
};

export function DataTableToolbar<TData>({ table }: Props<TData>) {
  return (
    <div className="flex flex-wrap items-end gap-4">
      {/* Filtro por sistema fonte */}
      <SourceSystemFilter table={table} />

      {/* 🔜 futuros filtros */}
      {/* <PersonFilter table={table} /> */}
      {/* <DateRangeFilter table={table} /> */}
    </div>
  );
}
