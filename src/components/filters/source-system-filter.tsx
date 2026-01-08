"use client";

import { Table } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";

type Props<TData> = {
  table: Table<TData>;
};

const OPTIONS = [
  { value: "Azure DevOps", color: "blue" },
  { value: "GLPI", color: "green" },
];

export function SourceSystemFilter<TData>({ table }: Props<TData>) {
  const column = table.getColumn("sourceSystem");
  if (!column) return null;

  const selectedValues = (column.getFilterValue() as string[]) ?? [];

  function toggle(value: string) {
    const next = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    column!.setFilterValue(next.length ? next : undefined);
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">Sistema Fonte</span>

      <div className="flex flex-wrap gap-2">
        {OPTIONS.map((opt) => {
          const active = selectedValues.includes(opt.value);

          return (
            <Badge
              key={opt.value}
              onClick={() => toggle(opt.value)}
              className={clsx(
                "cursor-pointer transition-all select-none",
                active
                  ? opt.color === "blue"
                    ? "bg-blue-600 text-white hover:bg-blue-500"
                    : "bg-green-600 text-white hover:bg-green-500"
                  : "border border-muted-foreground text-muted-foreground hover:bg-muted"
              )}
            >
              {opt.value}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
