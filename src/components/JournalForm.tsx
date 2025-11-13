"use client";

import { useMemo, useState } from "react";
import { z } from "zod";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type {
  JournalAnalysis,
  JournalFormProps,
  JournalFormValues,
} from "@/types";
import { journalMoodOptions, journalTagSuggestions } from "@/constants";

const analysisSchema = z.object({
  mood: z.string(),
  stress_level: z.number(),
  topic: z.string(),
  summary: z.string(),
  advice: z.string(),
});

const JournalForm = ({ initialValues }: JournalFormProps) => {
  const [text, setText] = useState(
    initialValues?.text ??
      "I feel overwhelmed with work but grateful for my family"
  );
  const [mood, setMood] = useState(initialValues?.mood ?? "");
  const [stressLevel, setStressLevel] = useState(
    initialValues?.stressLevel ?? 5
  );
  const [tags, setTags] = useState<string[]>(
    () =>
      initialValues?.tags?.filter((tag): tag is string =>
        Boolean(tag && tag.trim().length > 0)
      ) ?? []
  );
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<JournalAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const isLoading = isAnalyzing;
  const characterCount = text.trim().length;

  const inactiveSuggestions = useMemo(
    () => journalTagSuggestions.filter((tag) => !tags.includes(tag)),
    [tags]
  );

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag)
        ? prev.filter((value) => value !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: JournalFormValues = {
      text: text.trim(),
      mood: mood || null,
      stressLevel,
      tags,
    };

    if (!payload.text) {
      setError("Please add a journal entry before analyzing.");
      return;
    }

    setError(null);
    setAnalysis(null);
    setIsAnalyzing(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: payload.text }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze journal entry. Please try again.");
      }

      const json = await response.json();
      const parsed = analysisSchema.safeParse(json);

      if (!parsed.success) {
        throw new Error("Unexpected response from analyzer. Please try again.");
      }

      const normalized: JournalAnalysis = {
        mood: parsed.data.mood,
        stressLevel: parsed.data.stress_level,
        topic: parsed.data.topic,
        summary: parsed.data.summary,
        advice: parsed.data.advice,
      };

      setAnalysis(normalized);
    } catch (submissionError) {
      const message =
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong while analyzing your entry.";
      setError(message);
    } finally {
      setIsAnalyzing(false);
    }
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

          <div className="space-y-3">
            <span className="text-sm font-medium text-muted-foreground">
              Tags
            </span>
            <div className="flex flex-wrap gap-2">
              {journalTagSuggestions.map((tag: string) => {
                const isActive = tags.includes(tag);
                return (
                  <Button
                    key={tag}
                    type="button"
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "rounded-full text-xs",
                      isActive && "bg-primary text-primary-foreground"
                    )}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Button>
                );
              })}
            </div>
            {inactiveSuggestions.length === 0 && (
              <p className="text-xs text-muted-foreground">
                All suggested tags are in use. Remove one to see it here again.
              </p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <span className="text-sm font-medium text-muted-foreground">
                Mood
              </span>
              <div className="flex flex-wrap gap-2">
                {journalMoodOptions.map((option: string) => {
                  const isActive = mood === option;
                  return (
                    <Button
                      key={option}
                      type="button"
                      variant={isActive ? "default" : "outline"}
                      size="sm"
                      className={cn(
                        "text-xs",
                        isActive && "bg-primary text-primary-foreground"
                      )}
                      onClick={() => setMood(isActive ? "" : option)}
                    >
                      {option}
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <label
                htmlFor="stress"
                className="flex items-center justify-between text-sm font-medium text-muted-foreground"
              >
                <span>Stress level</span>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground">
                  {stressLevel}/10
                </span>
              </label>
              <input
                id="stress"
                type="range"
                min={1}
                max={10}
                value={stressLevel}
                onChange={(event) => setStressLevel(Number(event.target.value))}
                className="w-full accent-primary"
              />
              <p className="text-xs text-muted-foreground">
                Slide to capture how intense things feel right now.
              </p>
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
              setText(
                initialValues?.text ??
                  "I feel overwhelmed with work but grateful for my family"
              );
              setMood(initialValues?.mood ?? "");
              setStressLevel(initialValues?.stressLevel ?? 5);
              setTags(
                initialValues?.tags?.filter((tag) => tag && tag.trim()) ?? []
              );
              setAnalysis(null);
              setError(null);
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
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                AI reflection
              </h3>
              <p className="text-sm text-muted-foreground">
                Based on your latest entry
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">
                Stress {analysis.stressLevel}/10
              </span>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                {analysis.mood}
              </span>
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
