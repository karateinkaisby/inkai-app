import type { MobileContent, MobilePage, MobilePageSlug } from "./types";

const CMS_URL =
  process.env.NEXT_PUBLIC_INKAI_CMS_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

const FALLBACK: MobileContent = {
  pages: [],
  carousels: [],
};

export function getCmsBaseUrl() {
  return CMS_URL;
}

export async function fetchMobileContent(): Promise<MobileContent> {
  try {
    const res = await fetch(`${CMS_URL}/api/mobile-web/content`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("[cms] fetch failed", res.status);
      return FALLBACK;
    }

    const json = await res.json();
    return {
      pages: json.pages ?? [],
      carousels: json.carousels ?? [],
    };
  } catch (error) {
    console.error("[cms] fetch error", error);
    return FALLBACK;
  }
}

export function getPageBySlug(
  content: MobileContent,
  slug: MobilePageSlug,
): MobilePage | undefined {
  return content.pages.find((page) => page.slug === slug);
}

export function resolveImageUrl(url: string) {
  if (!url) return "/logo.png";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return url;
  return `/${url}`;
}
