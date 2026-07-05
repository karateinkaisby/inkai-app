"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  MobileCarouselRow,
  MobilePageRow,
  MobilePageSlug,
} from "@/app/lib/mobile-web/types";

export function useMobileWebContent() {
  const [pages, setPages] = useState<MobilePageRow[]>([]);
  const [carousels, setCarousels] = useState<MobileCarouselRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canEdit, setCanEdit] = useState<boolean | null>(null);

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const meRes = await fetch("/api/me", { credentials: "include" });
      if (!meRes.ok) {
        setCanEdit(false);
        throw new Error("Sesi tidak valid");
      }

      const meJson = await meRes.json();
      const email = (meJson?.user?.email as string | null)?.toLowerCase() ?? null;
      const rootEmail =
        (process.env.NEXT_PUBLIC_INKAI_ROOT_EMAIL as string | undefined)?.toLowerCase() ??
        null;
      const isSuperadmin =
        (rootEmail && email && email === rootEmail) ||
        meJson?.profile?.app_role === "SUPERADMIN";
      const hasPP =
        (meJson?.structural_roles ?? []).some(
          (r: { active?: boolean; structural_level?: number }) =>
            r.active && (r.structural_level ?? 0) >= 5,
        ) ?? false;

      setCanEdit(isSuperadmin || hasPP);

      const [pagesRes, carouselRes] = await Promise.all([
        fetch("/api/mobile-web/pages", { credentials: "include" }),
        fetch("/api/mobile-web/carousels", { credentials: "include" }),
      ]);

      if (!pagesRes.ok) throw new Error("Gagal memuat halaman");
      if (!carouselRes.ok) throw new Error("Gagal memuat carousel");

      const pagesJson = await pagesRes.json();
      const carouselJson = await carouselRes.json();

      setPages(pagesJson.pages ?? []);
      setCarousels(carouselJson.carousels ?? []);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Terjadi kesalahan";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const updatePage = async (slug: MobilePageSlug, payload: Partial<MobilePageRow>) => {
    const res = await fetch("/api/mobile-web/pages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ slug, ...payload }),
    });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      throw new Error(json.error ?? "Gagal menyimpan halaman");
    }
    await fetchAll();
  };

  const createCarousel = async (payload: Partial<MobileCarouselRow>) => {
    const res = await fetch("/api/mobile-web/carousels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      throw new Error(json.error ?? "Gagal menambah carousel");
    }
    await fetchAll();
  };

  const updateCarousel = async (id: string, payload: Partial<MobileCarouselRow>) => {
    const res = await fetch("/api/mobile-web/carousels", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id, ...payload }),
    });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      throw new Error(json.error ?? "Gagal mengupdate carousel");
    }
    await fetchAll();
  };

  const deleteCarousel = async (id: string) => {
    const res = await fetch(`/api/mobile-web/carousels?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      throw new Error(json.error ?? "Gagal menghapus carousel");
    }
    await fetchAll();
  };

  const getPage = (slug: MobilePageSlug) => pages.find((p) => p.slug === slug);

  return {
    pages,
    carousels,
    loading,
    error,
    canEdit,
    fetchAll,
    updatePage,
    createCarousel,
    updateCarousel,
    deleteCarousel,
    getPage,
  };
}
