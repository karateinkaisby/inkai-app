"use client";

import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";
import type { HomeExtra } from "./content/HomeContent";
import type { MobilePage } from "@/lib/types";

type Props = {
  page?: MobilePage;
  hero?: HomeExtra;
};

export default function PublicHeader({ page, hero }: Props) {
  const title = hero?.hero_title ?? page?.title ?? "INKAI";
  const subtitle = hero?.hero_subtitle ?? page?.subtitle ?? "Digital Ecosystem";

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0a0a0c]/85 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <Image src="/logo.png" alt="INKAI Logo" width={34} height={34} />
          <div className="min-w-0">
            <h1 className="text-base font-bold truncate">{title}</h1>
            <p className="text-xs text-white/50 truncate">{subtitle}</p>
          </div>
        </div>
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-xs font-semibold text-amber-200"
        >
          <User size={14} />
          <span>Masuk</span>
        </Link>
      </div>
    </header>
  );
}
