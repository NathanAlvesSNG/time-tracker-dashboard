import { IconFolder } from "@tabler/icons-react";
import DashboardCard from "../dashboard-card";

type Props = {
  projectsQuantity: number;
};

export default function ActiveProjectsCard({ projectsQuantity }: Props) {
  return (
    <DashboardCard
      title="Projetos Ativos"
      value={projectsQuantity}
      icon={IconFolder}
      description="Número de projetos atualmente ativos"
    />
  );
}
