import type { TablerIcon } from "@tabler/icons-react";
import React from "react";
import { useFilters } from "@/contexts/filters-context";
import { sourceSystemConfig } from "@/lib/source-system";
import { Badge } from "./ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type DashboardCardProps = {
  title: string;
  value: string | number;
  icon: TablerIcon;
  description?: string;
};

export default function DashboardCard(props: DashboardCardProps) {
  const { sourceSystem } = useFilters();
  const { title, value, icon, description } = props;
  const source = sourceSystemConfig[sourceSystem ? sourceSystem : "All"];

  return (
    <Card className="@container/card">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardDescription className="flex items-center gap-2">
            {icon &&
              React.createElement(icon, {
                className: "size-4 text-muted-foreground",
              })}
            {title}
          </CardDescription>
          {source && (
            <Badge
              variant={source.variant}
              className={`flex items-center gap-1 text-xs ${source.className}`}
            >
              {React.createElement(source.icon, {
                className: "size-4",
              })}
              {source.label}
            </Badge>
          )}
        </div>

        <CardTitle className="text-3xl font-semibold tabular-nums">
          {value}
        </CardTitle>
      </CardHeader>

      {description && (
        <CardFooter className="pt-0">
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardFooter>
      )}
    </Card>
  );
}
