"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { DailyHours } from "@/types/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Props = {
  data: DailyHours[];
};

const chartConfig = {
  available: {
    label: "Horas disponíveis",
    color: "var(--chart-1)",
  },
  worked: {
    label: "Horas trabalhadas",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function UserDailyHoursBarChart({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Horas Disponíveis x Horas Trabalhadas</CardTitle>
        <CardDescription>
          Acompanhamento diário das horas disponíveis e trabalhadas
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            margin={{ top: 16, right: 16, left: 8, bottom: 8 }}
          >
            <CartesianGrid vertical={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}h`}
            />
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
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dashed"
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
            <Bar dataKey="available" fill="var(--chart-1)" radius={4}>
              <LabelList
                dataKey="available"
                position="top"
                fill="var(--foreground)"
                fontSize={11}
              />
            </Bar>
            <Bar dataKey="worked" fill="var(--chart-2)" radius={4}>
              <LabelList
                dataKey="worked"
                position="top"
                fill="var(--foreground)"
                fontSize={11}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
