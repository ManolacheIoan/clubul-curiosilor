import type { FaqItem } from "@/data/faq";

/** Listă de întrebări expandabile, cu <details>: funcționează cu tastatura și fără JavaScript. */
export function Faq({ items, headingLevel = 3 }: { items: FaqItem[]; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as const;
  return (
    <div className="faq">
      {items.map((q) => (
        <details key={q.id} id={q.id} className="faq__item">
          <summary>
            <H className="faq__q">{q.question}</H>
            <span className="faq__toggle" aria-hidden="true" />
          </summary>
          <div className="faq__a">
            {q.answer.map((a) => (
              <p key={a.slice(0, 20)}>{a}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
