import type { MaknaItem, MobilePage } from "@/lib/types";

export default function MaknaLambangContent({ page }: { page?: MobilePage }) {
  const items = Array.isArray(page?.extra?.items)
    ? (page!.extra.items as MaknaItem[])
    : [];

  return (
    <section className="px-4 pt-4 space-y-4">
      <div className="glass-card p-4">
        <h2 className="section-title">{page?.title ?? "Makna Lambang"}</h2>
        {page?.subtitle && <p className="section-subtitle mt-1">{page.subtitle}</p>}
        {page?.body && <p className="prose-mobile mt-3">{page.body}</p>}
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <article key={`${item.symbol}-${index}`} className="glass-card p-4">
            <h3 className="text-sm font-semibold text-amber-200">{item.symbol}</h3>
            <p className="prose-mobile mt-2">{item.meaning}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
