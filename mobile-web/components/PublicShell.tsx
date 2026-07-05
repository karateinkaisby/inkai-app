import PublicBottomNav from "@/components/PublicBottomNav";
import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import { parseHomeExtra } from "@/components/content/HomeContent";

export default function PublicShell({
  children,
  page,
}: {
  children: React.ReactNode;
  page?: Parameters<typeof PublicHeader>[0]["page"];
}) {
  const hero = parseHomeExtra(page);

  return (
    <>
      <PublicHeader page={page} hero={hero} />
      <div>{children}</div>
      <PublicFooter />
      <PublicBottomNav />
    </>
  );
}
