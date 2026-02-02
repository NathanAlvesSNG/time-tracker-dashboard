import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/auth-context";
import { mapSourceSystemToApi } from "@/mappers/source-system.mapper";
import { getUserDailyProductivity } from "@/services/dashboard.service";
import { useUserInfo } from "./use-user-info";

type Filters = {
  sourceSystem?: string;
  startTime: string;
  endTime: string;
  person?: string;
};

type DailyProductivityResponse = {
  date: string;
  available: number;
  worked: number;
  productivity: number;
};

export function useDailyProductivity(
  { sourceSystem, startTime, endTime, person }: Filters,
  options?: { enabled?: boolean },
  isAdmin = false,
) {
  const { user } = useAuth();

  const userInfoQuery = useUserInfo(
    { userName: person ?? "" },
    {
      enabled: isAdmin && !!person,
    },
  );

  const userId = isAdmin ? userInfoQuery.data?.id : user?.id;

  const enabled =
    Boolean(startTime && endTime && userId) && (options?.enabled ?? true);

  const query = useQuery<DailyProductivityResponse[]>({
    queryKey: ["daily-productivity", userId, startTime, endTime],
    enabled,
    queryFn: async () => {
      const data = await getUserDailyProductivity({
        userId: Number(userId),
        startTime: startTime,
        endTime: endTime,
        sourceSystem: sourceSystem,
      });

      return data;
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    refetch: query.refetch,
  };
}
