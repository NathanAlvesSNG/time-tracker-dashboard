import AvailableHoursCard from "./cards/availalbe-hours";
import HoursWorkedCard from "./cards/hours-worked";
import ProductivityCard from "./cards/productivity";
import ProductivityTeamCard from "./cards/productivity-team";

type Props = {
  productivity: number;
  availableHours: number;
  workedHours: number;
  score: number;
  label: string;
};

export default function DashboardPersonalCards({
  productivity,
  availableHours,
  workedHours,
  label,
}: Props) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-3 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <AvailableHoursCard availableHours={availableHours} />
      <HoursWorkedCard workedHours={workedHours} />
      <ProductivityCard productivity={productivity} />
      <ProductivityTeamCard label={label} />
    </div>
  );
}
