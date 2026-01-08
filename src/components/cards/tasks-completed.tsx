import DashboardCard from "../dashboard-card";
import { IconCheck } from "@tabler/icons-react";

export default function TasksCompletedCard() {
  return (
    <DashboardCard
      title="Tarefas Concluídas"
      value="10"
      icon={IconCheck}
      description="Seu time concluiu 10 tarefas esta semana"
      sourceSystem="GLPI"
    />
  );
}
