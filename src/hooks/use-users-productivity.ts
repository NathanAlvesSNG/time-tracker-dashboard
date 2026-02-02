import { useQuery } from "@tanstack/react-query";
import { getUsersProductivity } from "@/services/dashboard.service";

type Filters = {
  startTime: string;
  endTime: string;
};

type UsersProductivityResponse = {
  person: string;
  availableHours: number;
  workedHours: number;
  doneTasks: number;
  sourceSystem: string;
  productivity: number;
};

export function useUsersProductivity(
  params?: Filters,
  options?: { enabled?: boolean },
) {
  const query = useQuery<UsersProductivityResponse[]>({
    queryKey: ["users-productivity", params?.startTime, params?.endTime],
    queryFn: async () => {
      const data = await getUsersProductivity(params);
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
