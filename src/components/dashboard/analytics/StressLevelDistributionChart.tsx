"use client";

import { useMemo } from "react";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { FilterPeriod } from "./utils";
import type { DistributionData } from "@/types";

type StressLevelDistributionChartProps = {
  distribution: DistributionData[];
  filterPeriod: FilterPeriod;
};

export default function StressLevelDistributionChart({
  distribution,
  filterPeriod,
}: StressLevelDistributionChartProps) {
  // Create pie chart config dynamically from stress level distribution
  const stressPieChartConfig = useMemo(() => {
    const config: Record<string, { label: string; color: string }> = {};
    distribution.forEach((item) => {
      config[item.name] = {
        label: item.name,
        color: item.fill,
      };
    });
    return config;
  }, [distribution]);

  const getDescription = () => {
    if (filterPeriod === "all") {
      return "Distribution of stress levels across all entries";
    }
    const periodText =
      filterPeriod === "today"
        ? "today"
        : filterPeriod === "week"
        ? "the last week"
        : "the last month";
    return `Stress level distribution for ${periodText}`;
  };

  return (
    <div className="rounded-2xl border border-border/60 bg-card/80 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Stress Level Distribution</h3>
        <p className="text-sm text-muted-foreground">{getDescription()}</p>
      </div>
      {distribution.length > 0 ? (
        <ChartContainer config={stressPieChartConfig}>
          <PieChart>
            <Pie
              data={distribution}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) =>
                percent !== undefined
                  ? `${name}: ${(percent * 100).toFixed(0)}%`
                  : name
              }
            >
              {distribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0];
                  return (
                    <div className="rounded-lg border border-border/50 bg-background px-3 py-2 text-xs shadow-md">
                      <p className="font-medium text-foreground">{data.name}</p>
                      <p className="text-muted-foreground">
                        {data.value} {data.value === 1 ? "entry" : "entries"}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              formatter={(value) => <span className="text-xs">{value}</span>}
            />
          </PieChart>
        </ChartContainer>
      ) : (
        <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
          No stress level data available
        </div>
      )}
    </div>
  );
}
