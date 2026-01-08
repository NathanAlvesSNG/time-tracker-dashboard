import { IconHourglassHigh } from "@tabler/icons-react";
import DashboardCard from "../dashboard-card";

export default function TasksInProgressCard() {
  return (
    <DashboardCard
      title="Tarefas em Progresso"
      value="12"
      icon={IconHourglassHigh}
      description="Seu time está trabalhando em 12 tarefas no momento"
      sourceSystem="Azure DevOps"
    />
  );
}
