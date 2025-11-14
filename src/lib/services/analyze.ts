import { JournalEntry } from "@/types";
import { z } from "zod";
const analysisSchema = z.object({
  mood: z.string(),
  stress_level: z.number(),
  topic: z.string(),
  summary: z.string(),
  advice: z.string(),
});

export default async function analyzeJournalEntry({
  text,
  setAnalysis,
  setError,
  setIsLoading,
}: {
  text: string;
  setAnalysis: (analysis: JournalEntry) => void;
  setError: (error: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}) {
  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error("Failed to analyze journal entry. Please try again.");
    }

    const json = await response.json();
    const parsed = analysisSchema.safeParse(json);

    if (!parsed.success) {
      throw new Error("Unexpected response from analyzer. Please try again.");
    }

    const normalized: JournalEntry = {
      id: json.id,
      user_id: json.user_id,
      text: json.text,
      mood: parsed.data.mood,
      stress_level: parsed.data.stress_level,
      topic: parsed.data.topic,
      summary: parsed.data.summary,
      advice: parsed.data.advice,
      created_at: json.created_at,
    };

    setAnalysis(normalized);
  } catch (submissionError) {
    const message =
      submissionError instanceof Error
        ? submissionError.message
        : "Something went wrong while analyzing your entry.";
    setError(message);
  } finally {
    setIsLoading(false);
  }
}
