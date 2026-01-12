import { IconAlertTriangle } from "@tabler/icons-react";
import DashboardCard from "../dashboard-card";

export default function HighestRecordedTicketTimeCard() {
  return (
    <DashboardCard
      title="Maior Tempo de Solução"
      value="00:10:35"
      icon={IconAlertTriangle}
      description="Tempo de solução mais longo de um ticket (hh:mm:ss)"
    />
  );
}
