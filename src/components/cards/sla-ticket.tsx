import { IconTarget } from "@tabler/icons-react";
import DashboardCard from "../dashboard-card";

export default function SLATicketCard() {
  return (
    <DashboardCard
      title="SLA"
      value="100%"
      icon={IconTarget}
      description="SLA de chamados (%)"
    />
  );
}
