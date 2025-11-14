// Re-export types from other type files
export type { FooterLink, FooterSection, SocialLink } from "./footer";

export type {
  FilterPeriod,
  ChartDataPoint,
  DistributionData,
  UserData,
} from "./analytics";

export type { TableHeaderItem } from "./table";

export type JournalEntry = {
  id: string;
  user_id: string;
  text: string;
  mood: string;
  stress_level: number;
  topic: string;
  summary: string;
  advice: string;
  created_at: string;
};
