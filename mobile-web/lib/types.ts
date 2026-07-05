export type MobilePageSlug =
  | "home"
  | "sejarah"
  | "makna-lambang"
  | "struktur-organisasi"
  | "visi-misi";

export type MobilePage = {
  id: string;
  slug: MobilePageSlug;
  title: string;
  subtitle: string | null;
  body: string | null;
  extra: Record<string, unknown>;
  is_published: boolean;
  updated_at: string;
};

export type MobileCarousel = {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string;
  link_url: string | null;
  order_index: number;
  is_active: boolean;
};

export type MobileContent = {
  pages: MobilePage[];
  carousels: MobileCarousel[];
};

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

export type MaknaItem = {
  symbol: string;
  meaning: string;
};

export type OrgMember = {
  name: string;
  position: string;
  photo_url?: string | null;
};

export type OrgLevel = {
  name: string;
  members: OrgMember[];
};

export const HALAMAN_SLUGS: MobilePageSlug[] = [
  "home",
  "sejarah",
  "makna-lambang",
  "struktur-organisasi",
  "visi-misi",
];

export const HALAMAN_LABELS: Record<MobilePageSlug, string> = {
  home: "Home",
  sejarah: "Sejarah",
  "makna-lambang": "Lambang",
  "struktur-organisasi": "Struktur",
  "visi-misi": "Visi",
};

export const HALAMAN_PATH: Record<MobilePageSlug, string> = {
  home: "/halaman/home",
  sejarah: "/halaman/sejarah",
  "makna-lambang": "/halaman/makna-lambang",
  "struktur-organisasi": "/halaman/struktur-organisasi",
  "visi-misi": "/halaman/visi-misi",
};

export function slugFromHalamanPath(path: string): MobilePageSlug | null {
  const slug = path.replace(/^\/halaman\//, "").replace(/\/$/, "");
  return HALAMAN_SLUGS.includes(slug as MobilePageSlug)
    ? (slug as MobilePageSlug)
    : null;
}
