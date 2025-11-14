"use client";

import { Button } from "@/components/ui/button";
import { FilterPeriod } from "./utils";

type FilterButtonsProps = {
  filterPeriod: FilterPeriod;
  onFilterChange: (period: FilterPeriod) => void;
};

export default function FilterButtons({
  filterPeriod,
  onFilterChange,
}: FilterButtonsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">Filter:</span>
      <div className="flex flex-wrap gap-2">
        {(["today", "week", "month", "all"] as FilterPeriod[]).map((period) => (
          <Button
            key={period}
            variant={filterPeriod === period ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange(period)}
            className="capitalize"
          >
            {period === "all" ? "All Time" : period}
          </Button>
        ))}
      </div>
    </div>
  );
}
