"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { WorkedHoursPerProject } from "@/types/api";

type Props = {
  data: WorkedHoursPerProject[];
};

const chartConfig = {
  project: {
    label: "Projetos",
    color: "var(--primary)",
  },
  workedHours: {
    label: "Horas trabalhadas",
    color: "var(--secondary)",
  },
} satisfies ChartConfig;

export function WorkedHoursPerProjectBarChart({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Horas por projeto</CardTitle>
        <CardDescription>
          Distribuição de horas trabalhadas por projeto
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <ChartContainer config={chartConfig}>
          <BarChart
            data={data}
            margin={{ top: 16, right: 16, left: 8, bottom: 8 }}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="project"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(v) => `${v}h`}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />

            <Bar
              dataKey="workedHours"
              radius={[6, 6, 0, 0]}
              fill="var(--primary)"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
