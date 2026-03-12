import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import type { TaskRow } from "@/types/tasks-list";

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

        return date.toLocaleDateString('pt-BR');
      },
    },
    {
      accessorKey: "status",
      header: "Status",
    }
]