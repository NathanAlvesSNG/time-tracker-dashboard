import { getSlaTicket } from "@/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";

type Filters = {
  startTime?: string;
  endTime?: string;
  person?: string;
};

type useSlaTicket = {
  totalTickets: number;
  insideSla: number;
  outsideSla: number;
  percentage: number;
};

export function useSlaTicket(
  filters: Filters,
  options?: { enabled?: boolean },
) {
  const query = useQuery<useSlaTicket>({
    queryKey: [
      "sla-ticket",
      filters.person,
      filters.startTime,
      filters.endTime,
    ],
    queryFn: async () => {
      const data = await getSlaTicket(filters);
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
