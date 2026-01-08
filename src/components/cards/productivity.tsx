import { IconChartLine } from "@tabler/icons-react";
import DashboardCard from "../dashboard-card";

export default function ProductivityCard() {
  return (
    <DashboardCard
      title="Produtividade"
      description="Acompanhe sua produtividade ao longo do tempo."
      icon={IconChartLine}
      value="87%"
      sourceSystem="Ambos"
    />
  );
}
