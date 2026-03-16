import { useQuery } from "@tanstack/react-query";
import { getAllTasksWithDeliveryDate } from "@/services/dashboard.service";

// Tipagem alinhada com o retorno do backend padronizado
// e mapeada para o formato usado pelas tabelas.
type TaskDeliveryResponse = {
  userName: string | null;
  taskName: string;
  sourceSystem: string;
  status_descritivo: string;
  deliveryDate: string;
};

type Filters = {
  person?: string;
  sourceSystem?: string;
};

export function useTasksWithDelivery(
  { person, sourceSystem }: Filters,
  options?: { enabled?: boolean },
) {
  const effectiveFilters = {
    person: person ?? "All",
    sourceSystem: sourceSystem ?? "All",
  };

  const query = useQuery<{
    person: string | null;
    task: string;
    sourceSystem: string;
    status: string;
    deliveryDate: string;
  }[]>({
    queryKey: ["tasks-with-delivery", effectiveFilters],
    queryFn: async () => {
      const apiFilters = {
        person:
          effectiveFilters.person === "All"
            ? undefined
            : effectiveFilters.person,
        sourceSystem:
          effectiveFilters.sourceSystem === "All"
            ? undefined
            : effectiveFilters.sourceSystem,
      };

      // Agora passamos os filtros diretamente para o service
      const data = await getAllTasksWithDeliveryDate(apiFilters);

      return data.map((task: TaskDeliveryResponse) => ({
        person: task.userName,
        task: task.taskName,
        sourceSystem: task.sourceSystem,
        status: task.status_descritivo,
        deliveryDate: task.deliveryDate,
      }));
    },
    enabled: options?.enabled,
    staleTime: 1000 * 60 * 5, // 5 minutos de cache
  });

  return {
    data: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}