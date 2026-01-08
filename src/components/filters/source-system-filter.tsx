"use client";

import { Table } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

type Props<TData> = {
  table: Table<TData>;
};

const OPTIONS = [
  { value: "Azure DevOps", label: "Azure DevOps" },
  { value: "GLPI", label: "GLPI" },
];

export function SourceSystemFilter<TData>({ table }: Props<TData>) {
  const value = table.getColumn("sourceSystem")?.getFilterValue() as
    | string
    | undefined;

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">Sistema</span>
      <Select
        value={value}
        onValueChange={(v) =>
          table
            .getColumn("sourceSystem")
            ?.setFilterValue(v === "all" ? undefined : v)
        }
        defaultValue="all"
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Selecione um sistema" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectGroup>
            <SelectLabel>Sistema</SelectLabel>
            {OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
