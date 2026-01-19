import { useAuth } from "@/contexts/auth-context";
import { useQuery } from "@tanstack/react-query";
import { getUserProductivity } from "@/services/dashboard.service";
import { useUserInfo } from "./use-user-info";

type Filters = {
  startTime: string;
  endTime: string;
  person?: string;
};

type ProductivityResponse = {
  person: string;
  workedHours: number;
  availableHours: number;
  productivity: number;
};

export function useProductivity(
  { startTime, endTime, person }: Filters,
  options?: { enabled?: boolean },
  isAdmin = false,
) {
  const { user } = useAuth();

  const { data: userInfo, isLoading: isUserInfoLoading } = useUserInfo(
    { userName: person! },
    { enabled: isAdmin && !!person },
  );

  const userId = isAdmin ? userInfo?.id : user?.id;

  const enabled =
    Boolean(startTime && endTime && userId) && (options?.enabled ?? true);

  const query = useQuery<ProductivityResponse>({
    queryKey: ["productivity", userId, startTime, endTime],
    enabled,
    queryFn: async () => {
      const response = await getUserProductivity({
        userId: Number(userId),
        startTime: startTime,
        endTime: endTime,
      });

      return response;
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    data: query.data,
    isLoading: query.isLoading || isUserInfoLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}
