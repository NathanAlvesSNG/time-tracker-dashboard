import type { ColumnDef } from "@tanstack/react-table";
import type { DateRangeFilter } from "@/components/filters/date-range-filter";
import { Badge } from "@/components/ui/badge";
import type { TimeTrackingPersonalRow } from "@/types/time-tracking";

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export const timeTracksColumnsPersonal: ColumnDef<TimeTrackingPersonalRow>[] = [
  {
    accessorKey: "person",
    header: "Pessoa",
    filterFn: "equalsString",
  },
  {
    accessorKey: "startTime",
    header: "Início",
    cell: ({ getValue }) => {
      const value = getValue<string>();

      const localDate = new Date(value.replace("Z", ""));

      return localDate.toLocaleString("pt-BR");
    },
    filterFn: (row, columnId, value) => {
      if (!value?.from && !value?.to) return true;

      const rowDate = new Date(row.getValue(columnId));

      if (value.from && rowDate < value.from) return false;
      if (value.to && rowDate > value.to) return false;

      return true;
    },
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusMap: Record<string, { label: string; className: string }> = {
        "1": {
          label: "Em andamento",
          className:
            "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
        },
        "2": {
          label: "Concluído",
          className:
            "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
        },
        "3": {
          label: "Pausado",
          className:
            "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
        },
      };
      const status = statusMap[row.original.status];

      if (!status) return null;

      return (
        <Badge
          className={`rounded-md px-2 py-1 text-sm font-medium ${status.className}`}
        >
          {status.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "sourceSystem",
    id: "sourceSystem",
    header: "Sistema",
    filterFn: "equalsString",
    cell: ({ getValue }) => (
      <Badge
        className={`${
          getValue<string>() === "Azure DevOps"
            ? "bg-blue-100 text-blue-800"
            : "bg-yellow-100 text-yellow-800"
        } px-2 py-1 text-sm font-medium rounded-md`}
      >
        {getValue<string>()}
      </Badge>
    ),
  },
];
