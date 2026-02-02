import { IconStopwatch } from "@tabler/icons-react";
import { formatSecondsToHMS } from "@/lib/utils";
import DashboardCard from "../dashboard-card";

type Props = {
  totalRunningTime: number;
};

export default function TotalRunningTimeCard({ totalRunningTime }: Props) {
  return (
    <DashboardCard
      title="Tempo Total de Execução"
      value={formatSecondsToHMS(totalRunningTime)}
      icon={IconStopwatch}
      description="Tempo total de execução de todas as tarefas (hh:mm:ss)"
    />
  );
}
