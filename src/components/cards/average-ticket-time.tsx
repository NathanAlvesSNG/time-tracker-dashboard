import { IconStopwatch } from "@tabler/icons-react";
import { formatSecondsToHMS } from "@/lib/utils";
import DashboardCard from "../dashboard-card";

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
