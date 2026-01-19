"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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
import type { WorkedHoursPerDay } from "@/types/api";
import { formatHoursToHHMM } from "@/lib/utils";

type Props = {
  data: WorkedHoursPerDay[];
};

const chartConfig = {
  workedHours: {
    label: "Horas trabalhadas",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function WorkedHoursPerDayLineChart({ data }: Props) {
  const isEmpty = !data || data.length === 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Horas trabalhadas por dia</CardTitle>
        <CardDescription>Tendência diária de horas trabalhadas</CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        {isEmpty ? (
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            Nenhum dado encontrado para os filtros selecionados
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <LineChart
              data={data}
              margin={{ top: 16, right: 24, left: 8, bottom: 8 }}
            >
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                  })
                }
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(v) => `${v}h`}
              />

              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="line"
                    labelFormatter={(value) =>
                      new Date(value).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    }
                  />
                }
              />

              <Line
                dataKey="workedHours"
                type="monotone"
                stroke="var(--chart-1)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
