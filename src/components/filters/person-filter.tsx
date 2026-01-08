"use client";

import { Table } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props<TData> = {
  table: Table<TData>;
};

export function PersonFilter<TData>({ table }: Props<TData>) {
  const column = table.getColumn("person");
  if (!column) return null;

  const value = column.getFilterValue() as string | undefined;

  const options = Array.from(
    new Set(
      table.getPreFilteredRowModel().rows.map((r) => r.getValue("person"))
    )
  ) as string[];

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">Pessoa</span>

      <Select
        value={value}
        onValueChange={(v) =>
          column.setFilterValue(v === "all" ? undefined : v)
        }
        defaultValue="all"
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Todas as pessoas" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          <SelectGroup>
            <SelectLabel>Pessoa</SelectLabel>
            {options.map((person) => (
              <SelectItem key={person} value={person}>
                {person}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
