import { notFound } from "next/navigation";
import PublicShell from "@/components/PublicShell";
import HomeContent from "@/components/content/HomeContent";
import SejarahContent from "@/components/content/SejarahContent";
import MaknaLambangContent from "@/components/content/MaknaLambangContent";
import StrukturContent from "@/components/content/StrukturContent";
import VisiMisiContent from "@/components/content/VisiMisiContent";
import { fetchMobileContent, getPageBySlug } from "@/lib/cms";
import {
  HALAMAN_SLUGS,
  slugFromHalamanPath,
  type MobilePageSlug,
} from "@/lib/types";

const CONTENT: Record<
  MobilePageSlug,
  React.ComponentType<{ page?: ReturnType<typeof getPageBySlug> }>
> = {
  home: HomeContent,
  sejarah: SejarahContent,
  "makna-lambang": MaknaLambangContent,
  "struktur-organisasi": StrukturContent,
  "visi-misi": VisiMisiContent,
};

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return HALAMAN_SLUGS.filter((slug) => slug !== "home").map((slug) => ({
    slug,
  }));
}

export default async function HalamanSlugPage({ params }: Props) {
  const { slug: rawSlug } = await params;
  const slug = slugFromHalamanPath(`/halaman/${rawSlug}`);

  if (!slug || slug === "home") notFound();

  const content = await fetchMobileContent();
  const page = getPageBySlug(content, slug);
  const View = CONTENT[slug];

  return (
    <PublicShell page={page}>
      <View page={page} />
    </PublicShell>
  );
}
