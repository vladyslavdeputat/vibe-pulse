"use client";

import { Activity, Calendar, TrendingUp, TrendingDown } from "lucide-react";

type AnalyticsStatsProps = {
  avgStress: number;
  totalEntries: number;
  weekEntries: number;
  mostCommonMood: string;
  stressTrend: number;
};

export default function AnalyticsStats({
  avgStress,
  totalEntries,
  weekEntries,
  mostCommonMood,
  stressTrend,
}: AnalyticsStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-lg border border-border/60 bg-card/80 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Avg Stress Level</p>
            <p className="text-2xl font-bold">{avgStress}/10</p>
          </div>
          <Activity className="h-8 w-8 text-muted-foreground" />
        </div>
      </div>

      <div className="rounded-lg border border-border/60 bg-card/80 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Entries</p>
            <p className="text-2xl font-bold">{totalEntries}</p>
          </div>
          <Calendar className="h-8 w-8 text-muted-foreground" />
        </div>
      </div>

      <div className="rounded-lg border border-border/60 bg-card/80 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">This Week</p>
            <p className="text-2xl font-bold">{weekEntries}</p>
          </div>
          <Calendar className="h-8 w-8 text-muted-foreground" />
        </div>
      </div>

      <div className="rounded-lg border border-border/60 bg-card/80 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Most Common Mood</p>
            <p className="text-lg font-semibold capitalize">{mostCommonMood}</p>
          </div>
          {stressTrend > 0 ? (
            <TrendingUp className="h-8 w-8 text-emerald-500" />
          ) : stressTrend < 0 ? (
            <TrendingDown className="h-8 w-8 text-red-500" />
          ) : (
            <Activity className="h-8 w-8 text-muted-foreground" />
          )}
        </div>
      </div>
    </div>
  );
}
