import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="border-t border-border/50 bg-gradient-to-br from-emerald-400/12 via-amber-300/8 to-yellow-300/6 py-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center">
        <h2 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          Tune into your well-being, one reflection at a time
        </h2>
        <p className="max-w-2xl text-base text-muted-foreground">
          Join Vibe Pulse to capture your mood, track stress, and follow
          personalized advice that helps you thrive. Your emotional dashboard
          awaits.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/sign-up">Get Started Free</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/journal">Log your first reflection</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
