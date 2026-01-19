import { IconChartLine } from "@tabler/icons-react";
import DashboardCard from "../dashboard-card";

type Props = {
  productivity: number;
};

export default function ProductivityCard({ productivity }: Props) {
  return (
    <DashboardCard
      title="Produtividade"
      description="Acompanhe sua produtividade ao longo do tempo."
      icon={IconChartLine}
      value={`${productivity}%`}
    />
  );
}
