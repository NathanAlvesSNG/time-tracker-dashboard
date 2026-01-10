import { IconStopwatch } from "@tabler/icons-react";
import DashboardCard from "../dashboard-card";

export default function HoursWorkedCard() {
  return (
    <DashboardCard
      title="Horas Trabalhadas"
      value="00:10:35"
      icon={IconStopwatch}
      description="Tempo total de execução de todas as tarefas (hh:mm:ss)"
    />
  );
}
