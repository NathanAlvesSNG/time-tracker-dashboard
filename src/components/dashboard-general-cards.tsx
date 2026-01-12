import ActiveProjectsCard from "./cards/active-projects";
import ActiveUsersCard from "./cards/active-users";
import TasksCompletedCard from "./cards/tasks-completed";
import TasksInProgressCard from "./cards/tasks-in-progress";
import TotalRunningTimeCard from "./cards/total-running-time";

export function DashboardGeneralCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-3 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-5 @4xl/main:grid-cols-3">
      <TasksInProgressCard />
      <TasksCompletedCard />
      <ActiveUsersCard />
      <ActiveProjectsCard />
      <TotalRunningTimeCard />
    </div>
  );
}
