import { IconHourglassHigh } from "@tabler/icons-react";
import DashboardCard from "../dashboard-card";

type Props = {
  quantity: number;
};

export default function TasksInProgressCard({ quantity }: Props) {
  return (
    <DashboardCard
      title="Tarefas em Progresso"
      value={quantity}
      icon={IconHourglassHigh}
      description="Quantidade de tarefas em andamento"
    />
  );
}
