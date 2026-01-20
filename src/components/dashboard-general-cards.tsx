import type { TimeTrackingRow } from "@/types/time-tracking";
import ActiveProjectsCard from "./cards/active-projects";
import ActiveUsersCard from "./cards/active-users";
import TasksInProgressCard from "./cards/tasks-in-progress";
import TotalRunningTimeCard from "./cards/total-running-time";
import type { Row } from "@tanstack/react-table";

type Props = {
  data: Row<TimeTrackingRow>[];
};

export function DashboardGeneralCards({ data }: Props) {
  const rows = data.map((row) => row.original);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-3 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 @4xl/main:grid-cols-3">
      <TasksInProgressCard quantity={rows.length} />

      <ActiveUsersCard
        usersQuantity={new Set(rows.map((item) => item.person)).size}
      />

      <ActiveProjectsCard
        projectsQuantity={new Set(rows.map((item) => item.project)).size}
      />

      <TotalRunningTimeCard
        totalRunningTime={rows.reduce((acc, item) => acc + item.duration, 0)}
      />
    </div>
  );
}
