import { createElement } from "react";
import type { ProductivityRow } from "@/types/time-tracking";
import { ColumnDef } from "@tanstack/react-table";
import { getProductivityUI } from "@/lib/utils";

export const timeTracksColumnsProductivity: ColumnDef<ProductivityRow>[] = [
  {
    accessorKey: "person",
    header: "Pessoa",
  },
  {
    accessorKey: "availableHours",
    header: "Horas disponíveis",
  },
  {
    accessorKey: "workedHours",
    header: "Horas trabalhadas",
  },
  {
    accessorKey: "doneTasks",
    header: "Tarefas concluidas",
  },
  {
    accessorKey: "productivity",
    header: "Produtividade",
    cell: ({ getValue }) => {
      const icon = getProductivityUI(Number(getValue())).icon;

      return (
        <span>
          {getValue() as number} -
          {icon && createElement(icon, { className: "size-8" })}
        </span>
      );
    },
  },
];
