import { getFilterOptions } from "@/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";

type FilterOptionsResponse = {
  users: string[];
  services: {
    project: string;
    sourceSystem: "Azure DevOps" | "iZit";
  }[];
};

export function useFilterOptions() {
  const query = useQuery<FilterOptionsResponse>({
    queryKey: ["filter-options"],
    queryFn: async () => {
      const data = await getFilterOptions();
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}
