"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import fetchAffirmation from "@/lib/services/fetchAffirmation";

const DailyAffirmation = () => {
  const [affirmation, setAffirmation] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-border/60 bg-card/80 p-6 shadow-lg backdrop-blur">
      <div className="flex flex-col gap-4 text-left">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-emerald-500/10 p-2 text-emerald-600">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
              Daily boost
            </p>
            <h3 className="text-lg font-semibold text-foreground">
              Tap for today’s affirmation
            </h3>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Need a moment of encouragement? Generate a fresh affirmation to keep
          your momentum going.
        </p>

        <Button
          type="button"
          size="lg"
          className="cursor-pointer"
          onClick={() =>
            fetchAffirmation({ setAffirmation, setError, setIsLoading })
          }
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
              Generating affirmation...
            </>
          ) : (
            "Get daily affirmation"
          )}
        </Button>

        {error && (
          <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        {affirmation && !error && (
          <blockquote className="relative rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-sm italic text-emerald-800">
            “{affirmation}”
          </blockquote>
        )}
      </div>
    </div>
  );
};

export default DailyAffirmation;
