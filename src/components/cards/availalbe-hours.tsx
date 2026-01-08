import { IconClock } from "@tabler/icons-react";
import DashboardCard from "../dashboard-card";

export default function AvailableHoursCard() {
  return (
    <DashboardCard
      title="Horas Disponíveis"
      description="Horas disponíveis para alocação em projetos."
      icon={IconClock}
      value="04:00:00"
      sourceSystem="Ambos"
    />
  );
}
