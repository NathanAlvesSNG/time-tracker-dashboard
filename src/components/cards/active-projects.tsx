import DashboardCard from "../dashboard-card";
import { IconFolder } from "@tabler/icons-react";

export default function ActiveProjectsCard() {
  return (
    <DashboardCard
      title="Projetos Ativos"
      value="3"
      icon={IconFolder}
      description="Número de projetos atualmente ativos"
    />
  );
}
