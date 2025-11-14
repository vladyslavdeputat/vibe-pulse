"use client";

import { JournalEntry } from "@/types";
import { useMemo, useState } from "react";
import FilterButtons from "./analytics/FilterButtons";
import AnalyticsStats from "./analytics/AnalyticsStats";
import StressLevelChart from "./analytics/StressLevelChart";
import StressLevelDistributionChart from "./analytics/StressLevelDistributionChart";
import {
  filterEntriesByPeriod,
  getStressColor,
  FilterPeriod,
} from "./analytics/utils";

const JournalAnalitics = ({
  journalEntries,
  error,
  isLoading,
}: {
  journalEntries: JournalEntry[];
  error: string | null;
  isLoading: boolean;
}) => {
  const [filterPeriod, setFilterPeriod] = useState<FilterPeriod>("all");

  // Filter entries based on selected period
  const filteredEntries = useMemo(() => {
    return filterEntriesByPeriod(journalEntries, filterPeriod);
  }, [journalEntries, filterPeriod]);

  // Get filtered entries data, grouped by date
  const chartData = useMemo(() => {
    if (filteredEntries.length === 0) return [];

    // Group by date and calculate averages
    const groupedByDate: Record<
      string,
      { stress: number[]; count: number; fullDate: Date }
    > = {};

    filteredEntries.forEach((entry) => {
      const entryDate = new Date(entry.created_at);
      const date = entryDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year:
          entryDate.getFullYear() !== new Date().getFullYear()
            ? "numeric"
            : undefined,
      });

      if (!groupedByDate[date]) {
        groupedByDate[date] = {
          stress: [],
          count: 0,
          fullDate: entryDate,
        };
      }

      groupedByDate[date].stress.push(entry.stress_level);
      groupedByDate[date].count++;
      // Keep the earliest date for this group for sorting
      if (entryDate < groupedByDate[date].fullDate) {
        groupedByDate[date].fullDate = entryDate;
      }
    });

    // Convert to chart data format (only stress, no mood)
    const data = Object.entries(groupedByDate)
      .map(([date, data]) => ({
        date,
        stress: Math.round(
          data.stress.reduce((a, b) => a + b, 0) / data.stress.length
        ),
        entries: data.count,
        fullDate: data.fullDate,
      }))
      .sort((a, b) => {
        // Sort by full date
        return a.fullDate.getTime() - b.fullDate.getTime();
      });

    return data;
  }, [filteredEntries]);

  // Calculate stress level distribution for pie chart
  const stressLevelDistribution = useMemo(() => {
    const stressCounts: Record<number, number> = {};

    filteredEntries.forEach((entry) => {
      const stressLevel = entry.stress_level;
      stressCounts[stressLevel] = (stressCounts[stressLevel] || 0) + 1;
    });

    // Convert to array format for pie chart, sorted by stress level
    const distribution = Object.entries(stressCounts)
      .map(([level, count]) => ({
        name: `Level ${level}`,
        value: count,
        fill: getStressColor(Number(level)),
        stressLevel: Number(level),
      }))
      .sort((a, b) => a.stressLevel - b.stressLevel); // Sort by stress level ascending

    return distribution;
  }, [filteredEntries]);

  // Calculate statistics based on filtered entries
  const stats = useMemo(() => {
    if (filteredEntries.length === 0) {
      return {
        avgStress: 0,
        totalEntries: 0,
        weekEntries: 0,
        stressTrend: 0,
        mostCommonMood: "N/A",
      };
    }

    const allStress = filteredEntries.map((e) => e.stress_level);
    const avgStress = Math.round(
      allStress.reduce((a, b) => a + b, 0) / allStress.length
    );

    // Get last week entries from filtered data
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weekEntries = filteredEntries.filter(
      (e) => new Date(e.created_at) >= sevenDaysAgo
    ).length;

    // Calculate stress trend (comparing first half vs second half of all data)
    let stressTrend = 0;
    if (chartData.length >= 2) {
      const firstHalf = chartData.slice(0, Math.ceil(chartData.length / 2));
      const secondHalf = chartData.slice(Math.ceil(chartData.length / 2));
      const firstAvg =
        firstHalf.reduce((a, b) => a + b.stress, 0) / firstHalf.length;
      const secondAvg =
        secondHalf.reduce((a, b) => a + b.stress, 0) / secondHalf.length;
      stressTrend = secondAvg - firstAvg;
    }

    // Most common mood
    const moodCounts: Record<string, number> = {};
    filteredEntries.forEach((entry) => {
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
    });
    const mostCommonMood =
      Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

    return {
      avgStress,
      totalEntries: filteredEntries.length,
      weekEntries,
      stressTrend,
      mostCommonMood,
    };
  }, [filteredEntries, chartData]);

  if (isLoading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
        <div className="text-center text-muted-foreground">
          Loading analytics...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
        <div className="text-center text-destructive">{error}</div>
      </div>
    );
  }

  if (journalEntries.length === 0) {
    return (
      <div className="rounded-2xl border border-border/60 bg-card/80 p-6 text-center text-muted-foreground">
        No journal entries yet. Start journaling to see your analytics!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <FilterButtons
        filterPeriod={filterPeriod}
        onFilterChange={setFilterPeriod}
      />

      <AnalyticsStats
        avgStress={stats.avgStress}
        totalEntries={stats.totalEntries}
        weekEntries={stats.weekEntries}
        mostCommonMood={stats.mostCommonMood}
        stressTrend={stats.stressTrend}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <StressLevelChart chartData={chartData} filterPeriod={filterPeriod} />
        <StressLevelDistributionChart
          distribution={stressLevelDistribution}
          filterPeriod={filterPeriod}
        />
      </div>
    </div>
  );
};

export default JournalAnalitics;
