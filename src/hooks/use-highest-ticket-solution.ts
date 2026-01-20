import { getHighestSolutionTimeTicket } from "@/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";

type Filters = {
  startTime?: string;
  endTime?: string;
  person?: string;
};

type HighestTicketSolution = {
  highestSolutionTimeTicket: number;
};

export function useHighestTicketSolution(
  filters: Filters,
  options?: { enabled?: boolean },
) {
  const query = useQuery<HighestTicketSolution>({
    queryKey: [
      "highest-ticket-solution",
      filters.person,
      filters.startTime,
      filters.endTime,
    ],
    queryFn: async () => {
      const data = await getHighestSolutionTimeTicket(filters);
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
