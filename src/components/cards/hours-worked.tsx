import { IconStopwatch } from "@tabler/icons-react";
import { formatHoursToHMS } from "@/lib/utils";
import DashboardCard from "../dashboard-card";

type Props = {
  workedHours: number;
};

export default function HoursWorkedCard({ workedHours }: Props) {
  return (
    <DashboardCard
      title="Horas Trabalhadas"
      value={formatHoursToHMS(workedHours)}
      icon={IconStopwatch}
      description="Tempo total de execução de todas as tarefas (hh:mm:ss)"
    />
  );
}
