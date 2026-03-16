import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import type { TaskRow } from "@/types/tasks-list";

const statusMap: Record<string, { label: string; className: string }> = {
  "em andamento": {
    label: "Em andamento",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  },
  "homologacao": {
    label: "Homologação",
    className: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  },
  "aguardando inicio": {
    label: "Aguardando Início",
    className: "bg-gray-50 text-gray-600 border border-gray-200 dark:bg-zinc-800/20 dark:text-zinc-400 dark:border-zinc-800",
  },
  "validacao": {
    label: "Validação",
    className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  },
};

const normalizeStatus = (value: string | undefined): string => {
  if (!value) return "";
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim()
    .toLowerCase();
};

const getStatusFromValue = (rawStatus: string | undefined) => {
  const normalized = normalizeStatus(rawStatus);
  if (!normalized) return undefined;

  if (statusMap[normalized]) return statusMap[normalized];

  if (normalized.includes("andamento")) return statusMap["em andamento"];
  if (normalized.includes("homolog")) return statusMap["homologacao"];
  if (normalized.includes("aguard")) return statusMap["aguardando inicio"];
  if (normalized.includes("valid")) return statusMap["validacao"];

  return undefined;
};

export const allTasksColumns: ColumnDef<TaskRow>[] = [
  {
    accessorKey: "person",
    header: "Pessoa",
    id: "person",
    filterFn: "equalsString",
  },
  {
    accessorKey: "taskName",
    header: "Tarefa",
    cell: ({ row }) => (
      <div className="whitespace-normal break-words max-w-[400px]">
        {row.original.taskName}
      </div>
    ),
  },
  {
    accessorKey: "environment",
    header: "Ambiente",
  },
  {
    accessorKey: "deliveryDate",
    header: "Data de Entrega",
    cell: ({ getValue }) => {
      const date = getValue() as Date;

      if (!date || isNaN(date.getTime())) {
        return "Sem data";
      }

      return date.toLocaleDateString("pt-BR");
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const rawStatus = getValue<string>();
      const status = getStatusFromValue(rawStatus);
      if (!status) {
        return (
          <Badge className="rounded-md px-2 py-1 text-sm font-medium bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300">
            {rawStatus || "Sem status"}
          </Badge>
        );
      }
      return (
        <Badge className={`rounded-md px-2 py-1 text-sm font-medium ${status.className}`}>
          {status.label}
        </Badge>
      );
    },
  },
];