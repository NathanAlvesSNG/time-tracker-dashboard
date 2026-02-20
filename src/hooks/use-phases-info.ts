import { useQuery } from "@tanstack/react-query";
import { normalizePhaseName } from "@/lib/utils";
import { getPhasesInfo } from "@/services/dashboard.service";

export type PhaseInfo = {
  phase: string;
  hours: number;
  project?: string;
};

export function usePhasesInfo(options?: { enabled?: boolean }) {
  const enabled = options?.enabled ?? true;

  return useQuery<PhaseInfo[]>({
    queryKey: ["phases-info"],
    enabled,
    queryFn: async () => {
      const rawData = await getPhasesInfo();

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
