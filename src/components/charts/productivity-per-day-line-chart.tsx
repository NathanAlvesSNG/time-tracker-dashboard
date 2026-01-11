"use client";

import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { ProductivityPerDayChart } from "@/types/api";

type Props = {
  data: ProductivityPerDayChart[];
};

const chartConfig = {
  productivity: {
    label: "Produtividade (%)",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function ProductivityPerDayLineChart({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Produtividade por dia</CardTitle>
        <CardDescription>
          Acompanhamento diário da produtividade
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              top: 16,
              right: 24,
              left: 8,
              bottom: 8,
            }}
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
              domain={[0, 100]}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}%`}
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
              dataKey="productivity"
              type="monotone"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            >
              <LabelList
                position="top"
                offset={8}
                className="fill-foreground"
                fontSize={11}
                formatter={(value: number) => `${value}%`}
                dataKey="productivity"
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
