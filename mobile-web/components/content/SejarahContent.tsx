import type { MobilePage, TimelineItem } from "@/lib/types";

export default function SejarahContent({ page }: { page?: MobilePage }) {
  const timeline = Array.isArray(page?.extra?.timeline)
    ? (page!.extra.timeline as TimelineItem[])
    : [];

  return (
    <section className="px-4 pt-4 space-y-4">
      <div className="glass-card p-4">
        <h2 className="section-title">{page?.title ?? "Sejarah INKAI"}</h2>
        {page?.subtitle && <p className="section-subtitle mt-1">{page.subtitle}</p>}
        {page?.body && <p className="prose-mobile mt-3">{page.body}</p>}
      </div>

      <div className="space-y-3">
        {timeline.map((item, index) => (
          <article key={`${item.year}-${index}`} className="glass-card p-4">
            <div className="text-xs font-bold text-amber-300">{item.year}</div>
            <h3 className="mt-1 text-sm font-semibold text-white">{item.title}</h3>
            <p className="prose-mobile mt-2">{item.description}</p>
          </article>
        ))}
        {timeline.length === 0 && (
          <p className="text-sm text-white/40 px-1">Belum ada timeline.</p>
        )}
      </div>
    </section>
  );
}
