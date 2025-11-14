import { cn } from "@/lib/utils";
import { advantages } from "@/constants/homePageData";

export default function AdvantagesSection() {
  return (
    <section className="border-t border-border/60 bg-card/40 py-20">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          Why Vibe Pulse
        </span>
        <h2 className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">
          Designed for deep well-being clarity
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          We combine compassionate AI reflections with data you can act on.
          Every feature is crafted to help you understand and nurture your
          emotional landscape.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((advantage) => (
            <div
              key={advantage.title}
              className={cn(
                "rounded-2xl border border-border/50 bg-background/80 p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              )}
            >
              <h3 className="text-lg font-semibold text-foreground">
                {advantage.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
