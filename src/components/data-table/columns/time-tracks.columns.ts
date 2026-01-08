"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { TimeTrackingRow } from "@/types/time-tracking";

export const timeTracksColumns: ColumnDef<TimeTrackingRow>[] = [
  {
    accessorKey: "person",
    header: "Pessoa",
    filterFn: "equalsString",
  },
  {
    accessorKey: "project",
    header: "Projeto",
  },
  {
    accessorKey: "task",
    header: "Tarefa",
  },
  {
    accessorKey: "startTime",
    header: "Início",
    cell: ({ getValue }) =>
      new Date(getValue<string>()).toLocaleString("pt-BR"),
  },
  {
    accessorKey: "duration",
    header: "Duração",
    cell: ({ getValue }) => {
      const seconds = getValue<number>();
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      return `${h}h ${m}m`;
    },
  },
  {
    accessorKey: "sourceSystem",
    header: "Sistema",
    filterFn: "equalsString",
    cell: ({ getValue }) =>
      Badge({
        children: getValue<string>(),
        className: `${
          getValue<string>() === "Azure DevOps"
            ? "bg-blue-100 text-blue-800"
            : "bg-yellow-100 text-yellow-800"
        } px-2 py-1 text-sm font-medium`,
      }),
  },
];
