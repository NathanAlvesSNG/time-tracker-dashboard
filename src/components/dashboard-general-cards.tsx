import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TasksInProgressCard from "./cards/tasks-in-progress";
import TasksCompletedCard from "./cards/tasks-completed";
import ActiveUsersCard from "./cards/active-users";
import ActiveProjectsCard from "./cards/active-projects";
import TotalRunningTimeCard from "./cards/total-running-time";

export function DashboardGeneralCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-5">
      <TasksInProgressCard />
      <TasksCompletedCard />
      <ActiveUsersCard />
      <ActiveProjectsCard />
      <TotalRunningTimeCard />
    </div>
  );
}
