import { IconStopwatch } from "@tabler/icons-react";
import DashboardCard from "../dashboard-card";

export default function AverageTicketTimeCard() {
  return (
    <DashboardCard
      title="Tempo Médio de Solução"
      value="00:10:35"
      icon={IconStopwatch}
      description="Tempo médio de solução de um ticket (hh:mm:ss)"
    />
  );
}
