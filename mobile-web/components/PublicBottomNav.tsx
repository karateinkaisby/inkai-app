"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Award,
  BookOpen,
  Home,
  Target,
  Users,
} from "lucide-react";
import {
  HALAMAN_LABELS,
  HALAMAN_PATH,
  HALAMAN_SLUGS,
  type MobilePageSlug,
} from "@/lib/types";

const ICONS: Record<MobilePageSlug, typeof Home> = {
  home: Home,
  sejarah: BookOpen,
  "makna-lambang": Award,
  "struktur-organisasi": Users,
  "visi-misi": Target,
};

export default function PublicBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-[#0a0a0c]/92 backdrop-blur-xl"
      aria-label="Navigasi halaman"
    >
      <div className="grid grid-cols-5 gap-1 px-2 py-2">
        {HALAMAN_SLUGS.map((slug) => {
          const href = HALAMAN_PATH[slug];
          const active = pathname === href || (slug === "home" && pathname === "/");
          const Icon = ICONS[slug];

          return (
            <Link
              key={slug}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] font-semibold transition-colors ${
                active
                  ? "bg-sky-500/15 text-sky-300"
                  : "text-white/45 hover:text-white/70"
              }`}
            >
              <Icon size={18} strokeWidth={active ? 2.5 : 2} />
              <span>{HALAMAN_LABELS[slug]}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
