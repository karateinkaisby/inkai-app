import type { MobilePage } from "@/lib/types";

export type HomeExtra = {
  hero_title?: string;
  hero_subtitle?: string;
  welcome_text?: string;
};

export function parseHomeExtra(page?: MobilePage): HomeExtra {
  if (!page?.extra) return {};
  return {
    hero_title:
      typeof page.extra.hero_title === "string" ? page.extra.hero_title : undefined,
    hero_subtitle:
      typeof page.extra.hero_subtitle === "string"
        ? page.extra.hero_subtitle
        : undefined,
    welcome_text:
      typeof page.extra.welcome_text === "string"
        ? page.extra.welcome_text
        : undefined,
  };
}

export default function HomeContent({ page }: { page?: MobilePage }) {
  const extra = parseHomeExtra(page);

  return (
    <section className="px-4 pt-4 space-y-3">
      <div className="glass-card p-4">
        <h2 className="section-title">{page?.title ?? "INKAI"}</h2>
        <p className="section-subtitle mt-1">
          {page?.subtitle ?? extra.hero_subtitle ?? "Digital Ecosystem"}
        </p>
        {(extra.welcome_text || page?.body) && (
          <p className="prose-mobile mt-3">
            {extra.welcome_text || page?.body}
          </p>
        )}
      </div>
    </section>
  );
}
