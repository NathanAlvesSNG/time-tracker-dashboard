import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/auth-context";
import { mapAllUserTasks } from "@/mappers/time-tracking.mapper";
import { getAllUserTasks } from "@/services/dashboard.service";
import { useUserInfo } from "./use-user-info";

type UserTasksResponse = {
  startTime: string;
  person: string;
  task: string;
  project: string;
  duration: number;
  status: string;
  sourceSystem: string;
  avaialableHours: number;
  workedHours: number;
};

type Filters = {
  sourceSystem?: string;
  startTime: string;
  endTime: string;
  person?: string;
};

export function useUserTasks(
  { startTime, endTime, sourceSystem, person }: Filters,
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

  const query = useQuery<UserTasksResponse[]>({
    queryKey: ["user-tasks", userId, startTime, endTime, sourceSystem],
    enabled,
    queryFn: async () => {
      if (!user?.id) return [];

      const apiFilters = {
        startTime,
        endTime,
        userId: Number(userId),
        sourceSystem,
      };

      const data = await getAllUserTasks(apiFilters);

      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const mappedData = mapAllUserTasks(query.data ?? []);

  return {
    data: mappedData,
    isLoading: query.isLoading || isUserInfoLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    refetch: query.refetch,
  };
}
