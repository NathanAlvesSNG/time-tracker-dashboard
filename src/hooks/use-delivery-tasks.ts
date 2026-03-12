import { useQuery } from "@tanstack/react-query";
import { getAllTasksWithDeliveryDate } from "@/services/dashboard.service";

// Tipagem alinhada com o retorno do backend padronizado
type TaskDeliveryResponse = {
  person: string;
  task: string;
  sourceSystem: string;
  status: string;
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

  const query = useQuery<TaskDeliveryResponse[]>({
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

      return data;
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