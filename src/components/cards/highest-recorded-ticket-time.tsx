import { IconAlertTriangle } from "@tabler/icons-react";
import { formatSecondsToHMS } from "@/lib/utils";
import DashboardCard from "../dashboard-card";

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
