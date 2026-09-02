import { jsonLdHtml } from "@/lib/json-ld";

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Renders nothing when empty, and only emits FAQPage schema when there's
 * real content - per planning/SEO-IMPLEMENTATION-PLAN.md §5 and the brief's
 * "only use verified questions/answers" instruction. No FAQ content exists
 * in the archive yet, so every current caller passes an empty array; this
 * component is ready for when the business supplies real Q&A.
 */
export function Faq({ items }: { items: FaqItem[] }) {
  if (!items.length) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section aria-labelledby="faq-heading" className="space-y-3">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(jsonLd) }} />
      <h2 id="faq-heading" className="font-display text-2xl font-semibold">
        Frequently Asked Questions
      </h2>
      <dl className="divide-y divide-border rounded-sm border border-border">
        {items.map((item, i) => (
          <div key={i} className="p-4">
            <dt className="font-medium">{item.question}</dt>
            <dd className="mt-1 text-sm text-ink-muted">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
