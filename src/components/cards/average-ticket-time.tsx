import { IconStopwatch } from "@tabler/icons-react";
import DashboardCard from "../dashboard-card";
import { formatSecondsToHMS } from "@/lib/utils";

type Props = {
  averageTicketTime: number;
};

export default function AverageTicketTimeCard({ averageTicketTime }: Props) {
  return (
    <DashboardCard
      title="Tempo Médio de Solução"
      value={formatSecondsToHMS(averageTicketTime)}
      icon={IconStopwatch}
      description="Tempo médio de solução de um ticket (hh:mm:ss)"
    />
  );
}
