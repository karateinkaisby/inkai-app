"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/app/lib/supabaseBrowser";

export type RantingOption = {
  label: string;
  value: string;
};

export default function useRantingOptions() {
  const [options, setOptions] = useState<RantingOption[]>([]);
  const [loading, setLoading] = useState(true);


        // Pastikan session sudah siap dulu, supaya query tidak "miss"
  useEffect(() => {
    const fetchRanting = async () => {
      setLoading(true);
      try {
        const { data } = await supabaseBrowser.auth.getSession();
        if (!data?.session?.user) {
          setOptions([]);
          return;
        }

        const res = await fetch("/api/ranting", { method: "GET", credentials: "include" });
        if (!res.ok) {
          const msg = await res.text().catch(() => "");
          console.warn("Gagal memuat ranting dari API:", res.status, msg);
          setOptions([]);
          return;
        }

        const list = (await res.json()) as Array<{ id: string; nama: string }>;
        setOptions(
          (list ?? []).map((r) => ({
            label: r.nama,
            value: String(r.id),
          }))
        );
      } catch {
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRanting();
  }, []);

  return { options, loading };
}