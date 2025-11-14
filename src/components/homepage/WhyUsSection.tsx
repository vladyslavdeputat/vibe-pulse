import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function WhyUsSection() {
  return (
    <section className="py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.1fr,1fr] lg:items-center">
        <div className="space-y-6 text-left max-w-2xl mx-auto flex flex-col items-center justify-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            The Vibe Pulse Promise
          </span>
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl text-center">
            Built with science, empathy, and actionable clarity
          </h2>
          <p className="text-base text-muted-foreground text-center">
            Vibe Pulse blends neuroscience research with coaching wisdom to help
            you stay grounded. Every reflection turns into a signal, every
            signal becomes guidance you can actually use.
          </p>
          <ul className="space-y-4">
            {[
              "Weekly emotional summaries spotlight triggers and personal wins.",
              "Adaptive stress scoring adjusts to your rhythms, not generic averages.",
              "Private, encrypted journaling with optional therapist collaboration.",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-muted-foreground"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/sign-up">Create your account</Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link href="/dashboard">See the personal analytics</Link>
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-400/20 via-cyan-300/10 to-amber-200/20 blur-2xl" />
          <div className="relative rounded-3xl border border-border/40 bg-background/90 p-8 shadow-xl backdrop-blur">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  Today's emotional pulse
                </p>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600">
                  Balanced
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4">
                  <p className="text-xs uppercase text-emerald-600">Mood arc</p>
                  <p className="mt-2 text-2xl font-semibold text-emerald-700">
                    Rising
                  </p>
                  <p className="mt-1 text-xs text-emerald-700/80">
                    Gratitude entries up 18% this week.
                  </p>
                </div>
                <div className="rounded-xl border border-amber-400/40 bg-amber-400/10 p-4">
                  <p className="text-xs uppercase text-amber-600">
                    Stress pulse
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-amber-700">
                    4
                  </p>
                  <p className="mt-1 text-xs text-amber-700/80">
                    Breathwork streak: 5 days strong.
                  </p>
                </div>
              </div>
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
                <p className="text-xs uppercase text-primary">
                  Personal advice
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  "Schedule a 15-minute reset walk today, and notice one moment
                  that invites calm."
                </p>
              </div>
              <div className="rounded-xl border border-border/30 bg-background/80 p-5">
                <p className="text-xs uppercase text-muted-foreground">
                  This week's highlights
                </p>
                <ul className="mt-2 space-y-2 text-xs text-muted-foreground">
                  <li>• Emotional clarity score climbed 12%.</li>
                  <li>
                    • Most positive entry: "Lunch with Jess reminded me I'm
                    supported."
                  </li>
                  <li>
                    • Biggest stressor: "Deadline crush" — flagged for follow
                    up.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
