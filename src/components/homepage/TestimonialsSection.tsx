import { testimonials } from "@/constants/homePageData";

export default function TestimonialsSection() {
  return (
    <section className="border-t border-border/60 bg-card/40 py-20">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          Voices of calm
        </span>
        <h2 className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">
          Loved by people prioritizing emotional resilience
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          From creative professionals to clinical experts, Vibe Pulse helps
          anyone turn emotional data into meaningful action.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex h-full flex-col justify-between rounded-2xl border border-border/40 bg-background/90 p-6 text-left shadow-sm"
            >
              <blockquote className="text-sm leading-relaxed text-muted-foreground">
                "{testimonial.quote}"
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <p className="font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
