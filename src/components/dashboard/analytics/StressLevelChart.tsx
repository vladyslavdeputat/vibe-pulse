"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { FilterPeriod } from "./utils";
import type { ChartDataPoint } from "@/types";

type StressLevelChartProps = {
  chartData: ChartDataPoint[];
  filterPeriod: FilterPeriod;
};

export default function StressLevelChart({
  chartData,
  filterPeriod,
}: StressLevelChartProps) {
  const stressChartConfig = {
    stress: {
      label: "Stress Level",
      theme: {
        light: "hsl(0, 84%, 60%)", // Red for stress
        dark: "hsl(0, 72%, 51%)",
      },
    },
  };

  const getDescription = () => {
    if (filterPeriod === "all") {
      return "Average stress level across all entries";
    }
    const periodText =
      filterPeriod === "today"
        ? "today"
        : filterPeriod === "week"
        ? "the last week"
        : "the last month";
    return `Average stress level for ${periodText}`;
  };

  return (
    <div className="rounded-2xl border border-border/60 bg-card/80 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Stress Level Trend</h3>
        <p className="text-sm text-muted-foreground">{getDescription()}</p>
      </div>
      {chartData.length > 0 ? (
        <ChartContainer config={stressChartConfig}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-xs"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-xs"
              domain={[0, 10]}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Line
              dataKey="stress"
              type="monotone"
              stroke="var(--color-stress)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      ) : (
        <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
          No data available
        </div>
      )}
    </div>
  );
}
