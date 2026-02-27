"use client";

import { usePathname } from "next/navigation";
import SakuraEffect from "./effects/SakuraEffect";

export default function SakuraController() {
  const pathname = usePathname();

  // Matikan sakura jika berada di /dashboard atau halaman turunannya
  const disableSakura =
    pathname?.startsWith("/dashboard") || pathname === "/dashboard";

  if (disableSakura) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[15]">
      <SakuraEffect count={45} />
    </div>
  );
}
