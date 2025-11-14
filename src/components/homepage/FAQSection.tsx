import { faqs } from "@/constants/homePageData";

export default function FAQSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          FAQ
        </span>
        <h2 className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">
          Ask anything about your well-being companion
        </h2>
        <div className="mt-8 space-y-6">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-border/40 bg-background/90 p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {faq.question}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
