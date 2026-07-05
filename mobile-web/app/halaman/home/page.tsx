import CarouselSection from "@/components/CarouselSection";
import HomeContent from "@/components/content/HomeContent";
import PublicShell from "@/components/PublicShell";
import QuickActions from "@/components/QuickActions";
import { fetchMobileContent, getPageBySlug } from "@/lib/cms";

export default async function HalamanHomePage() {
  const content = await fetchMobileContent();
  const page = getPageBySlug(content, "home");

  return (
    <PublicShell page={page}>
      <CarouselSection items={content.carousels} />
      <QuickActions />
      <HomeContent page={page} />
    </PublicShell>
  );
}
