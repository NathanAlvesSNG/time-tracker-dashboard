import { IconClock } from "@tabler/icons-react";
import DashboardCard from "../dashboard-card";
import { formatHoursToHMS } from "@/lib/utils";

type Props = {
  availableHours: number;
};

export default function AvailableHoursCard({ availableHours }: Props) {
  return (
    <DashboardCard
      title="Horas Disponíveis"
      description="Horas disponíveis para alocação em projetos."
      icon={IconClock}
      value={formatHoursToHMS(availableHours)}
    />
  );
}
