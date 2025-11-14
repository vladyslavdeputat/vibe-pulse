import { StressLevelBar, StressStatus } from "../StressIndicator";
import { JournalEntry } from "@/types";
import TablePaginated from "@/components/ui/tablePaginated";
import { journalHistoryTableHeaderItems } from "@/constants";

const JournalHistoryTable = ({
  journalEntries,
  error,
  isLoading,
}: {
  journalEntries: JournalEntry[];
  error: string | null;
  isLoading: boolean;
}) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const renderRow = (entry: JournalEntry) => {
    return (
      <>
        <td className="px-6 py-4 align-middle">
          <div className="text-sm">{formatDate(entry.created_at)}</div>
          <div className="text-xs text-muted-foreground">
            {new Date(entry.created_at).toLocaleTimeString()}
          </div>
        </td>
        <td className="px-6 py-4 align-middle">
          <div className="flex items-center gap-2">
            <StressStatus stressLevel={entry.stress_level} mood={entry.mood} />
          </div>
        </td>
        <td className="px-6 py-4 align-middle">
          <StressLevelBar stressLevel={entry.stress_level} />
        </td>
        <td className="px-6 py-4 align-middle capitalize">
          <span className="text-sm">{entry.topic}</span>
        </td>
        <td className="px-6 py-4 align-top max-w-md">
          <div className="rounded-lg border border-border/40 bg-muted/30 p-3">
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {entry.advice}
            </p>
          </div>
        </td>
      </>
    );
  };

  return (
    <TablePaginated
      title="Journal History"
      description="Your latest reflections, sorted by most recent first."
      headItemsArray={journalHistoryTableHeaderItems}
      data={journalEntries}
      renderRow={renderRow}
      isLoading={isLoading}
      error={error || undefined}
      emptyMessage="No journal entries yet. Try analyzing a new reflection!"
      getItemKey={(entry) => entry.id}
    />
  );
};

export default JournalHistoryTable;
