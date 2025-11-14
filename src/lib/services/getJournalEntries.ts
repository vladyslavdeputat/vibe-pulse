import { JournalEntry } from "@/types";

export async function getJournalEntries({
  setJournalEntries,
  setError,
  setIsLoading,
}: {
  setJournalEntries: (entries: JournalEntry[]) => void;
  setError: (error: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
}) {
  try {
    setIsLoading(true);
    const response = await fetch("/api/journal-entries");

    if (!response.ok) {
      const data = await response.json();
      setError(data.error || "Failed to fetch journal entries");
      return;
    }

    const data = await response.json();
    setJournalEntries(data.entries || []);
    setError(null);
  } catch (err) {
    setError("Failed to fetch journal entries");
    console.error("[DashboardWrapper] Error:", err);
  } finally {
    setIsLoading(false);
  }
}
