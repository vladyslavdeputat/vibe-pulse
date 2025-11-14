import { JournalEntry, FilterPeriod } from "@/types";

// Get color for stress level (1-10)
export const getStressColor = (stressLevel: number): string => {
  if (stressLevel <= 3) {
    return "hsl(142, 76%, 36%)"; // Green for low stress
  } else if (stressLevel <= 6) {
    return "hsl(38, 92%, 50%)"; // Yellow for medium stress
  } else {
    return "hsl(0, 84%, 60%)"; // Red for high stress
  }
};

// Re-export FilterPeriod for convenience
export type { FilterPeriod } from "@/types";

// Filter entries by time period
export const filterEntriesByPeriod = (
  entries: JournalEntry[],
  period: FilterPeriod
): JournalEntry[] => {
  if (period === "all") return entries;

  const now = new Date();
  const entryDate = new Date();

  switch (period) {
    case "today":
      entryDate.setHours(0, 0, 0, 0);
      break;
    case "week":
      entryDate.setDate(now.getDate() - 7);
      break;
    case "month":
      entryDate.setMonth(now.getMonth() - 1);
      break;
  }

  return entries.filter((entry) => {
    const createdDate = new Date(entry.created_at);
    return createdDate >= entryDate;
  });
};
