import { useAverageTicketSolution } from "@/hooks/use-average-ticket-solution";
import { useHighestTicketSolution } from "@/hooks/use-highest-ticket-solution";
import { useSlaTicket } from "@/hooks/use-sla-ticket";
import { DashboardFilters } from "../types";

export function useDashboardTicket(filters: DashboardFilters, enabled = true) {
  const averageTicketSolution = useAverageTicketSolution(filters, { enabled });
  const highestTicketSolution = useHighestTicketSolution(filters, { enabled });
  const slaTicket = useSlaTicket(filters, { enabled });

  return {
    averageTicketSolution: averageTicketSolution.data,
    highestTicketSolution: highestTicketSolution.data,
    slaTicket: slaTicket.data,
    isLoading:
      averageTicketSolution.isLoading ||
      highestTicketSolution.isLoading ||
      slaTicket.isLoading,
    refetch: () => {
      averageTicketSolution.refetch();
      highestTicketSolution.refetch();
      slaTicket.refetch();
    },
  };
}
