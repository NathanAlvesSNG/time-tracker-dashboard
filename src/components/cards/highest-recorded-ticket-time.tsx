import { IconAlertTriangle } from "@tabler/icons-react";
import DashboardCard from "../dashboard-card";
import { formatSecondsToHMS } from "@/lib/utils";

type Props = { highestTicketTime: number };

export default function HighestRecordedTicketTimeCard({
  highestTicketTime,
}: Props) {
  return (
    <DashboardCard
      title="Maior Tempo de Solução"
      value={formatSecondsToHMS(highestTicketTime)}
      icon={IconAlertTriangle}
      description="Tempo de solução mais longo de um ticket (hh:mm:ss)"
    />
  );
}
