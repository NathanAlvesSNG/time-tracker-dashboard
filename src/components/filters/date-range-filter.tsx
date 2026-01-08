"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";

type Props<TData> = {
  table: Table<TData>;
};

export function DateRangeFilter<TData>({ table }: Props<TData>) {
  const column = table.getColumn("startTime");
  if (!column) return null;

  const value = (column.getFilterValue() as { from?: Date; to?: Date }) ?? {};

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">Período</span>

      <div className="flex gap-2">
        <Input
          type="date"
          value={value.from ? formatDate(value.from) : ""}
          onChange={(e) =>
            column.setFilterValue({
              ...value,
              from: e.target.value ? new Date(e.target.value) : undefined,
            })
          }
        />

        <Input
          type="date"
          value={value.to ? formatDate(value.to) : ""}
          onChange={(e) =>
            column.setFilterValue({
              ...value,
              to: e.target.value ? new Date(e.target.value) : undefined,
            })
          }
        />
      </div>
    </div>
  );
}

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}
