"use client";

import { useState } from "react";
import JarvisLoader from "@/components/JarvisLoader";
import { MOBILE_PAGE_LABELS, type MobilePageSlug } from "@/app/lib/mobile-web/types";
import { useMobileWebContent } from "./hooks/useMobileWebContent";
import HomeEditor from "./components/HomeEditor";
import SejarahEditor from "./components/SejarahEditor";
import MaknaLambangEditor from "./components/MaknaLambangEditor";
import StrukturEditor from "./components/StrukturEditor";
import VisiMisiEditor from "./components/VisiMisiEditor";
import CarouselEditor from "./components/CarouselEditor";

type TabKey = MobilePageSlug | "carousel";

const TABS: { key: TabKey; label: string }[] = [
  { key: "home", label: MOBILE_PAGE_LABELS.home },
  { key: "sejarah", label: MOBILE_PAGE_LABELS.sejarah },
  { key: "makna-lambang", label: MOBILE_PAGE_LABELS["makna-lambang"] },
  { key: "struktur-organisasi", label: MOBILE_PAGE_LABELS["struktur-organisasi"] },
  { key: "visi-misi", label: MOBILE_PAGE_LABELS["visi-misi"] },
  { key: "carousel", label: "Carousel" },
];

export default function MobileWebModule() {
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [toast, setToast] = useState<string | null>(null);

  const {
    loading,
    error,
    canEdit,
    carousels,
    updatePage,
    createCarousel,
    updateCarousel,
    deleteCarousel,
    getPage,
  } = useMobileWebContent();

  async function handleSavePage(
    slug: MobilePageSlug,
    payload: Parameters<typeof updatePage>[1],
  ) {
    try {
      await updatePage(slug, payload);
      setToast("Konten berhasil disimpan");
      setTimeout(() => setToast(null), 2500);
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Gagal menyimpan");
    }
  }

  if (loading || canEdit === null) {
    return <JarvisLoader label="Memuat konten mobile web..." />;
  }

  if (!canEdit) {
    return (
      <div className="p-6 text-sm text-yellow-400">
        Halaman ini hanya dapat diakses oleh admin PP (level 5) atau Superadmin.
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-sm text-red-400">{error}</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold">Konten Mobile Web</h1>
        <p className="text-sm text-white/50">
          Kelola halaman publik di{" "}
          <a
            href="https://inkai-mobile-web.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="text-sky-400 hover:underline"
          >
            inkai-mobile-web.vercel.app
          </a>
        </p>
      </header>

      {toast && (
        <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
          {toast}
        </div>
      )}

      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              activeTab === tab.key
                ? "bg-sky-600 text-white"
                : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <section className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
        {activeTab === "home" && (
          <HomeEditor
            page={getPage("home")}
            onSave={(payload) => handleSavePage("home", payload)}
          />
        )}
        {activeTab === "sejarah" && (
          <SejarahEditor
            page={getPage("sejarah")}
            onSave={(payload) => handleSavePage("sejarah", payload)}
          />
        )}
        {activeTab === "makna-lambang" && (
          <MaknaLambangEditor
            page={getPage("makna-lambang")}
            onSave={(payload) => handleSavePage("makna-lambang", payload)}
          />
        )}
        {activeTab === "struktur-organisasi" && (
          <StrukturEditor
            page={getPage("struktur-organisasi")}
            onSave={(payload) => handleSavePage("struktur-organisasi", payload)}
          />
        )}
        {activeTab === "visi-misi" && (
          <VisiMisiEditor
            page={getPage("visi-misi")}
            onSave={(payload) => handleSavePage("visi-misi", payload)}
          />
        )}
        {activeTab === "carousel" && (
          <CarouselEditor
            carousels={carousels}
            onCreate={createCarousel}
            onUpdate={updateCarousel}
            onDelete={deleteCarousel}
          />
        )}
      </section>
    </div>
  );
}
