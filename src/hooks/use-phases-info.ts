import { useQuery } from "@tanstack/react-query";
import { normalizePhaseName } from "@/lib/utils";
import { getPhasesInfo } from "@/services/dashboard.service";

type Filters = {
  startTime: string;
  endTime: string;
};

export type PhaseInfo = {
  phase: string;
  hours: number;
  project?: string;
};

export function usePhasesInfo(
  { startTime, endTime }: Filters,
  options?: { enabled?: boolean },
) {
  const enabled = Boolean(startTime && endTime) && (options?.enabled ?? true);

  return useQuery<PhaseInfo[]>({
    queryKey: ["phases-info", startTime, endTime],
    enabled,
    queryFn: async () => {
      const rawData = await getPhasesInfo({ startTime, endTime });

      return rawData.map((item: any) => ({
        phase: normalizePhaseName(item.phase),
        hours: Number(item.totalHours) || 0,
        project: item.projectName || undefined,
      }));
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
