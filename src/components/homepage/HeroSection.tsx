import Link from "next/link";
import { Button } from "@/components/ui/button";
import DailyAffirmation from "@/components/DailyAffirmation";
import { stats } from "@/constants/homePageData";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/15 via-amber-300/10 to-yellow-300/8 blur-3xl" />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-24 pt-24 sm:pt-32">
        <div className="flex flex-col items-center gap-12 text-center lg:flex-row lg:items-stretch lg:text-left">
          <div className="flex flex-1 flex-col items-center gap-6 lg:items-start">
            <span className="inline-flex items-center rounded-full border border-primary/40 bg-card/80 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              Elevate your emotional well-being
            </span>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Listen to your inner rhythm with{" "}
              <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500 bg-clip-text text-transparent">
                Vibe Pulse
              </span>
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              Track mood swings, measure stress, and receive compassionate AI
              reflections that help you realign. Vibe Pulse transforms scattered
              feelings into a personal well-being dashboard that empowers your
              next best step.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/sign-up">Start your well-being journey</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/journal">Explore the journal experience</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 lg:max-w-lg items-center justify-center flex">
            <DailyAffirmation />
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-6 rounded-2xl border border-border/60 bg-card/70 p-6 backdrop-blur-md sm:grid-cols-3">
          {stats.map((item) => (
            <div key={item.label} className="space-y-2 text-center ">
              <p className="text-3xl font-semibold text-foreground">
                {item.value}
              </p>
              <p className="text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
