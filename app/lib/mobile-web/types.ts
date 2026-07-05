export type MobilePageSlug =
  | "home"
  | "sejarah"
  | "makna-lambang"
  | "struktur-organisasi"
  | "visi-misi";

export type MobilePageRow = {
  id: string;
  slug: MobilePageSlug;
  title: string;
  subtitle: string | null;
  body: string | null;
  extra: Record<string, unknown>;
  is_published: boolean;
  updated_at: string;
  updated_by: string | null;
};

export type MobileCarouselRow = {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string;
  link_url: string | null;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  updated_by: string | null;
};

export type HomeExtra = {
  hero_title?: string;
  hero_subtitle?: string;
  welcome_text?: string;
};

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

export type SejarahExtra = {
  timeline?: TimelineItem[];
};

export type MaknaItem = {
  symbol: string;
  meaning: string;
};

export type MaknaLambangExtra = {
  items?: MaknaItem[];
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

export type StrukturExtra = {
  levels?: OrgLevel[];
};

export type VisiMisiExtra = {
  visi?: string;
  misi?: string[];
};

export const MOBILE_PAGE_SLUGS: MobilePageSlug[] = [
  "home",
  "sejarah",
  "makna-lambang",
  "struktur-organisasi",
  "visi-misi",
];

export const MOBILE_PAGE_LABELS: Record<MobilePageSlug, string> = {
  home: "Home",
  sejarah: "Sejarah",
  "makna-lambang": "Makna Lambang",
  "struktur-organisasi": "Struktur Organisasi",
  "visi-misi": "Visi & Misi",
};
