"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser as supabase } from "@/app/lib/supabaseBrowser";

import { User } from "@supabase/supabase-js";
import { Anggota } from "../types/Anggota";
import type { KyuItem } from "../types/Anggota";

/** Baris profile dari Supabase (ranting bisa object atau array) */
type ProfileRow = {
  id: string;
  user_id?: string;
  nama?: string;
  nomor?: string;
  status?: string;
  dan?: number | null;
  ranting?: { id: string; nama?: string } | { id: string; nama?: string }[];
};

/** Satu baris DAN dari DB */
export type DanRow = {
  dan: number;
  tanggal?: string;
  mshNumber?: string;
};

/** Satu baris pelatihan/sertifikasi dari DB */
export type PelatihanRow = {
  id: string;
  nama: string;
  tanggal: string;
  kategori: string;
};

export function useMyKeanggotaan() {
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState<Anggota | null>(null);
  const [kyu, setKyu] = useState<KyuItem[]>([]);
  const [dan, setDan] = useState<DanRow[]>([]);
  const [pelatihan, setPelatihan] = useState<PelatihanRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        console.log("[useMyKeanggotaan] Auth gagal atau tidak login:", error?.message ?? "no user");
        setUser(null);
        setLoading(false);
        return;
      }

      console.log("[useMyKeanggotaan] Auth OK, user_id:", user.id);
      setUser(user);

      const { data: anggota, error: errProfile } = await supabase
        .from("profiles")
        .select(`
          id,
          user_id,
          nama,
          nomor,
          status,
          ranting:ranting_id (
            id,
            nama
          )
        `)
        .eq("user_id", user.id)
        .single();

      console.log("[useMyKeanggotaan] Profile dari DB:", { anggota, errProfile: errProfile?.message });

      const raw = anggota as ProfileRow | ProfileRow[] | null;
      const singleProfile: ProfileRow | null =
        raw && !Array.isArray(raw) ? raw : Array.isArray(raw) && raw.length > 0 ? (raw[0] as ProfileRow) : null;

      if (!errProfile && singleProfile) {
        const rantingRaw = singleProfile.ranting;
        const rantingOne: { id: string; nama?: string } | null =
          Array.isArray(rantingRaw) && rantingRaw.length > 0
            ? (rantingRaw[0] as { id: string; nama?: string })
            : (rantingRaw as { id: string; nama?: string } | null) ?? null;

        console.log("[useMyKeanggotaan] Ranting (resolved):", rantingOne);

        const profileId = String(singleProfile.id);

        const mapped: Anggota = {
          id: profileId,
          user_id: singleProfile.user_id ? String(singleProfile.user_id) : undefined,
          nama: String(singleProfile.nama ?? ""),
          nomor: singleProfile.nomor ?? undefined,
          status: singleProfile.status ?? undefined,
          dan: singleProfile.dan ?? null,
          ranting: rantingOne
            ? { id: String(rantingOne.id), nama: String(rantingOne.nama ?? "") }
            : { id: "-", nama: "-" },
        };

        console.log("[useMyKeanggotaan] Data anggota (mapped):", mapped);
        setData(mapped);

        /* Pamungkas: ambil riwayat KYU, DAN, Pelatihan lewat API server (service role) agar tidak kena permission denied */
        try {
          const res = await fetch("/api/keanggotaan/riwayat", { credentials: "include" });
          if (res.ok) {
            const json = await res.json();
            const kyuList: KyuItem[] = Array.isArray(json.kyu) ? json.kyu : [];
            const danList: DanRow[] = Array.isArray(json.dan) ? json.dan : [];
            const pelatihanList: PelatihanRow[] = Array.isArray(json.pelatihan) ? json.pelatihan : [];
            setKyu(kyuList);
            setDan(danList);
            setPelatihan(pelatihanList);
            console.log("[useMyKeanggotaan] Riwayat dari API:", { kyu: kyuList.length, dan: danList.length, pelatihan: pelatihanList.length });
          } else {
            console.warn("[useMyKeanggotaan] API riwayat:", res.status, await res.text());
          }
        } catch (e) {
          console.warn("[useMyKeanggotaan] API riwayat error:", e);
        }
      } else {
        console.log("[useMyKeanggotaan] Profile tidak ada atau error, data tidak di-set");
      }

      setLoading(false);
    };

    load();
  }, []);

  return { user, data, loading, kyu, dan, pelatihan };
}
