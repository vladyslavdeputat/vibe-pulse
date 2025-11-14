"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { JournalEntry } from "@/types";
import analyzeJournalEntry from "@/lib/services/analyze";
import { StressStatus, StressLevelBar } from "@/components/StressIndicator";

const JournalForm = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState<string>("");
  const [analysis, setAnalysis] = useState<JournalEntry | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const characterCount = text.trim().length;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!text) {
      setError("Please add a journal entry before analyzing.");
      return;
    }

    setError("");
    setAnalysis(null);
    setIsLoading(true);

    await analyzeJournalEntry({ text, setAnalysis, setError, setIsLoading });
  };

  return (
    <div className="w-full max-w-xl">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-lg backdrop-blur-sm transition duration-300 ease-out"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              New journal entry
            </h2>
            <p className="text-sm text-muted-foreground">
              Capture how you feel, then let AI reflect it back with insight.
            </p>
          </div>
          <Sparkles className="size-6 text-primary" aria-hidden="true" />
        </div>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="text"
              className="text-sm font-medium text-muted-foreground"
            >
              What’s on your mind?
            </label>
            <Textarea
              id="text"
              name="text"
              value={text}
              placeholder="I’m feeling..."
              onChange={(event) => setText(event.target.value)}
              aria-describedby="entry-helper"
            />
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
              <span id="entry-helper">
                The more detail you add, the better the AI guidance becomes.
              </span>
              <span>{characterCount} characters</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setText("");
            }}
            disabled={isLoading}
          >
            Reset
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
                Analyzing
              </>
            ) : (
              "Analyze & Save"
            )}
          </Button>
        </div>
      </form>

      {analysis && (
        <section className="mt-6 rounded-2xl border border-border/60 bg-card/80 p-6 shadow-lg backdrop-blur-sm transition duration-300 ease-out">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                AI reflection
              </h3>
              <p className="text-sm text-muted-foreground">
                Based on your latest entry
              </p>
            </div>
            <div className="flex items-center gap-4">
              <StressStatus
                stressLevel={analysis.stress_level}
                mood={analysis.mood}
              />
              <div className="w-full sm:w-48">
                <StressLevelBar stressLevel={analysis.stress_level} />
              </div>
            </div>
          </div>

          <dl className="mt-6 space-y-4 text-sm text-muted-foreground">
            <div>
              <dt className="font-medium text-foreground">Summary</dt>
              <dd className="mt-1 leading-relaxed text-muted-foreground">
                {analysis.summary}
              </dd>
            </div>

            <div>
              <dt className="font-medium text-foreground">Topic</dt>
              <dd className="mt-1 capitalize leading-relaxed text-muted-foreground">
                {analysis.topic}
              </dd>
            </div>

            <div>
              <dt className="font-medium text-foreground">Advice</dt>
              <dd className="mt-1 leading-relaxed text-muted-foreground">
                {analysis.advice}
              </dd>
            </div>
          </dl>
        </section>
      )}
    </div>
  );
};

export default JournalForm;
