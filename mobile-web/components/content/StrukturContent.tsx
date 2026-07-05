import Image from "next/image";
import type { MobilePage, OrgLevel } from "@/lib/types";
import { resolveImageUrl } from "@/lib/cms";

export default function StrukturContent({ page }: { page?: MobilePage }) {
  const levels = Array.isArray(page?.extra?.levels)
    ? (page!.extra.levels as OrgLevel[])
    : [];

  return (
    <section className="px-4 pt-4 space-y-4">
      <div className="glass-card p-4">
        <h2 className="section-title">{page?.title ?? "Struktur Organisasi"}</h2>
        {page?.subtitle && <p className="section-subtitle mt-1">{page.subtitle}</p>}
        {page?.body && <p className="prose-mobile mt-3">{page.body}</p>}
      </div>

      {levels.map((level, index) => (
        <div key={`${level.name}-${index}`} className="space-y-2">
          <h3 className="px-1 text-sm font-bold text-sky-300">{level.name}</h3>
          <div className="space-y-2">
            {(level.members ?? []).map((member, memberIndex) => (
              <article
                key={`${member.name}-${memberIndex}`}
                className="glass-card flex items-center gap-3 p-3"
              >
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white/10 shrink-0">
                  {member.photo_url ? (
                    <Image
                      src={resolveImageUrl(member.photo_url)}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-white/40">
                      INKAI
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold truncate">{member.name}</div>
                  <div className="text-xs text-white/50 truncate">{member.position}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
