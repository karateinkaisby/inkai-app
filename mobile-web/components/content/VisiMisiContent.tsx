import type { MobilePage } from "@/lib/types";

export default function VisiMisiContent({ page }: { page?: MobilePage }) {
  const visi = typeof page?.extra?.visi === "string" ? page.extra.visi : "";
  const misi = Array.isArray(page?.extra?.misi)
    ? (page!.extra.misi as string[])
    : [];

  return (
    <section className="px-4 pt-4 space-y-4">
      <div className="glass-card p-4">
        <h2 className="section-title">{page?.title ?? "Visi & Misi"}</h2>
        {page?.subtitle && <p className="section-subtitle mt-1">{page.subtitle}</p>}
      </div>

      <article className="glass-card p-4">
        <h3 className="text-sm font-bold text-amber-300">Visi</h3>
        <p className="prose-mobile mt-2">{visi || "Konten visi belum diisi."}</p>
      </article>

      <article className="glass-card p-4">
        <h3 className="text-sm font-bold text-sky-300">Misi</h3>
        <ol className="mt-3 space-y-2">
          {misi.map((item, index) => (
            <li key={index} className="flex gap-2 text-sm text-white/75">
              <span className="font-bold text-amber-300">{index + 1}.</span>
              <span>{item}</span>
            </li>
          ))}
          {misi.length === 0 && (
            <li className="text-sm text-white/40">Konten misi belum diisi.</li>
          )}
        </ol>
      </article>
    </section>
  );
}
