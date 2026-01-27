"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import type { WorkedHoursPerPerson } from "@/types/api";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContentWithFormattedHour,
} from "../ui/chart";

type Props = {
  data: WorkedHoursPerPerson[];
};

const chartConfig = {
  workedHours: {
    label: "Horas trabalhadas",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function WorkedHoursPerPersonBarChart({ data }: Props) {
  const isEmpty = !data || data.length === 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Horas trabalhadas por colaborador</CardTitle>
        <CardDescription>Performance individual da equipe</CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        {isEmpty ? (
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            Nenhum dado encontrado para os filtros selecionados
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart
              data={data}
              layout="vertical"
              margin={{
                top: 8,
                right: 24,
                left: 24,
                bottom: 8,
              }}
            >
              <CartesianGrid horizontal={false} />

              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(v) => `${v}h`}
              />

              <YAxis
                type="category"
                dataKey="person"
                tickLine={false}
                axisLine={false}
                width={120}
              />

              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContentWithFormattedHour indicator="dot" />
                }
              />

              <Bar
                dataKey="workedHours"
                fill="var(--chart-1)"
                radius={[0, 4, 4, 0]}
                barSize={28}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
