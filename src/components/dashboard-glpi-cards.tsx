import AverageTicketTimeCard from "./cards/average-ticket-time";
import HighestRecordedTicketTimeCard from "./cards/highest-recorded-ticket-time";
import SLATicketCard from "./cards/sla-ticket";

export default function DashboardGlpiCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-3 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @4xl/main:grid-cols-3">
      <AverageTicketTimeCard />
      <HighestRecordedTicketTimeCard />
      <SLATicketCard />
    </div>
  );
}
