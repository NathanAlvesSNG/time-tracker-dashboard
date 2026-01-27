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
  ChartTooltipContentWithFormattedHour,
} from "@/components/ui/chart";

import type { TotalHoursPerPersonPerProject } from "@/types/api";

type Props = {
  data: TotalHoursPerPersonPerProject[];
};

export default function TotalHoursPerPersonPerProjectBarChart({ data }: Props) {
  const isEmpty = !data || data.length === 0;
  const projects = Array.from(new Set(data.map((d) => d.project)));
  const chartConfig: ChartConfig = projects.reduce((acc, project, index) => {
    acc[project] = {
      label: project,
      color: `var(--chart-${index + 1})`,
    };
    return acc;
  }, {} as ChartConfig);

  const chartData = Object.values(
    data.reduce<Record<string, any>>((acc, item) => {
      if (!acc[item.person]) {
        acc[item.person] = { person: item.person };
      }

      acc[item.person][item.project] = item.workedHours;
      return acc;
    }, {}),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Horas Totais por pessoa e projeto</CardTitle>
        <CardDescription>
          Distribuição de horas trabalhadas por colaborador e projeto
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isEmpty ? (
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            Nenhum dado encontrado para os filtros selecionados
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{ top: 16, right: 16, left: 8, bottom: 8 }}
            >
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="person"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}h`}
              />

              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContentWithFormattedHour indicator="dashed" />
                }
              />

              {projects.map((project) => (
                <Bar
                  key={project}
                  dataKey={project}
                  fill={`var(--chart-${projects.indexOf(project) + 1})`}
                  radius={4}
                />
              ))}
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
