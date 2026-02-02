import { useQuery } from "@tanstack/react-query";
import { getAverageTicketSolution } from "@/services/dashboard.service";

type Filters = {
  startTime?: string;
  endTime?: string;
  person?: string;
};

type AverageTicketSolution = {
  averageSolutionTimeTicket: number;
};

export function useAverageTicketSolution(
  filters: Filters,
  options?: { enabled?: boolean },
) {
  const query = useQuery<AverageTicketSolution>({
    queryKey: [
      "average-ticket-solution",
      filters.person,
      filters.startTime,
      filters.endTime,
    ],
    queryFn: async () => {
      const data = await getAverageTicketSolution(filters);
      return data;
    },
    enabled: options?.enabled,
    staleTime: 1000 * 60 * 5,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}
