import type { ColumnDef } from "@tanstack/react-table";
import { cn, getProductivityUI } from "@/lib/utils";
import type { ProductivityRow } from "@/types/time-tracking";

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
    id: "productivity",
    header: () => <div className="text-left">Produtividade</div>,
    cell: ({ getValue }) => {
      const value = Number(getValue());
      const { emoji, text, border } = getProductivityUI(value);

      return (
        <div className="grid grid-cols-[1fr_auto] items-center gap-2 justify-end">
          <span className="w-12 text-right text-sm font-medium tabular-nums">
            {value}%
          </span>

          <span
            className={cn(
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-md border text-base",
              border,
            )}
            title={text}
          >
            {emoji}
          </span>
        </div>
      );
    },
  },
];
