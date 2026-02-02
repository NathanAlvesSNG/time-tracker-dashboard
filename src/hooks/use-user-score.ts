import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/auth-context";
import { getUserScore } from "@/services/dashboard.service";
import { useUserInfo } from "./use-user-info";

type ScoreResponse = {
  individualProductivity: number;
  teamAverageProductivity: number;
  score: number;
  classification:
    | "VERY_ABOVE_AVERAGE"
    | "ABOVE_AVERAGE"
    | "AVERAGE"
    | "BELOW_AVERAGE"
    | "CRITICAL";
  label: string;
};

type Filters = {
  startTime: string;
  endTime: string;
  sourceSystem?: string;
  person?: string;
};

export function useUserScore(
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

  const query = useQuery<ScoreResponse>({
    queryKey: ["user-score", userId, startTime, endTime, sourceSystem],
    enabled,
    queryFn: async () => {
      return getUserScore({
        userId: Number(userId),
        startTime,
        endTime,
        sourceSystem,
      });
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    data: query.data,
    isLoading: query.isLoading || isUserInfoLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    refetch: query.refetch,
  };
}
