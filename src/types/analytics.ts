export type FilterPeriod = "today" | "week" | "month" | "all";

export type ChartDataPoint = {
  date: string;
  stress: number;
  entries: number;
  fullDate: Date;
};

export type DistributionData = {
  name: string;
  value: number;
  fill: string;
  stressLevel: number;
};

export type UserData = {
  id: string;
  firstName: string | null;
  emailAddress: string | null;
};
