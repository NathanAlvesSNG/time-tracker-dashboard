import { IconCheck } from "@tabler/icons-react";
import DashboardCard from "../dashboard-card";

export default function TasksCompletedCard() {
  return (
    <DashboardCard
      title="Tarefas Concluídas"
      value="10"
      icon={IconCheck}
      description="Seu time concluiu 10 tarefas esta semana"
    />
  );
}
