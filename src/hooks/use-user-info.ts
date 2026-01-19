import { getUserByName } from "@/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";

type Filters = {
  userName: string;
};

type UseUserInfo = {
  id: string;
  userName: string;
  userEmail: string;
  role: string;
  cargaHoraria: number;
};

export function useUserInfo(filters: Filters, options?: { enabled?: boolean }) {
  const query = useQuery<UseUserInfo>({
    queryKey: ["user-info", filters.userName],
    queryFn: async () => {
      const response = await getUserByName({ userName: filters.userName });
      return response;
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
