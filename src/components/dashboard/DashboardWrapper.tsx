"use client";

import JournalHistoryTable from "./JournalHistoryTable";
import JournalAnalitics from "./JournalAnalitics";
import { useState, useEffect } from "react";
import { JournalEntry, UserData } from "@/types";
import { getJournalEntries } from "@/lib/services/getJournalEntries";

const DashboardWrapper = ({ user }: { user: UserData }) => {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getJournalEntries({ setJournalEntries, setError, setIsLoading });
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back, {user.firstName || user.emailAddress}!
          </p>
        </div>
        <JournalAnalitics
          journalEntries={journalEntries}
          error={error}
          isLoading={isLoading}
        />
        <JournalHistoryTable
          journalEntries={journalEntries}
          error={error}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default DashboardWrapper;
