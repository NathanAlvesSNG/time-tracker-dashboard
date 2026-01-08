import AvailableHoursCard from "./cards/availalbe-hours";
import HoursWorkedCard from "./cards/hours-worked";
import ProductivityCard from "./cards/productivity";
import ProductivityTeamCard from "./cards/productivity-team";

export default function DashboardPersonalCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-3 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <AvailableHoursCard />
      <HoursWorkedCard />
      <ProductivityCard />
      <ProductivityTeamCard />
    </div>
  );
}
