import { IconTarget } from "@tabler/icons-react";
import DashboardCard from "../dashboard-card";

type Props = {
  slaPercentage: number;
};

export default function SLATicketCard({ slaPercentage }: Props) {
  return (
    <DashboardCard
      title="SLA"
      value={`${slaPercentage}%`}
      icon={IconTarget}
      description="SLA de chamados (%)"
    />
  );
}
