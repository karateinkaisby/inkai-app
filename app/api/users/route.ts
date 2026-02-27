export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/app/lib/supabase/admin";
import { getSessionUser } from "@/app/lib/supabase/session";
import { requireSuperadmin } from "@/app/lib/security/requireSuperadmin";

export async function GET() {
  try {
    const user = await getSessionUser();
    const gate = await requireSuperadmin(user);
    if (!gate.ok) {
      return NextResponse.json({ message: "Forbidden" }, { status: gate.status });
    }

    const supabaseAdmin = createSupabaseAdminClient();

    // ===============================
    // 1️⃣ Ambil PROFILES
    // ===============================
    const { data: profiles, error: profileError } =
      await supabaseAdmin
        .from("profiles")
        .select(`
          id,
          nama,
          nik,
          telepon,
          jenis_kelamin,
          email,
          app_role,
          alamat,
          tanggal_lahir,
          nama_ayah,
          nama_ibu,
          province_id,
          regency_id,
          district_id,
          village_id,
          avatar_path,
          created_at,
          villages ( name )
        `)
        .order("created_at", { ascending: false });

    if (profileError) {
      console.error("[API /users] profiles error:", profileError);
      return NextResponse.json(
        { message: profileError.message },
        { status: 500 }
      );
    }

    // ===============================
    // 2️⃣ Ambil AUTH USERS (CARA RESMI)
    // ===============================
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.listUsers();

    if (authError) {
      console.error("[API /users] auth error:", authError);
      return NextResponse.json(
        { message: authError.message },
        { status: 500 }
      );
    }

    // ===============================
    // 3️⃣ MERGE (AUTH + PROFILES)
    // ===============================

    // Map profiles by id
    const profileMap = new Map(
      (profiles ?? []).map((p) => [p.id, p])
    );

    // Union: semua auth users
    const result = authData.users.map((u) => {
      const p = profileMap.get(u.id);

      return {
        id: u.id,

        // IDENTITAS UTAMA
        email:
          p?.email && p.email.trim() !== ""
            ? p.email
            : u.email ?? "-",

        nama:
          p?.nama && p.nama.trim() !== ""
            ? p.nama
            : "Belum Lengkap",
          cabang:
          (Array.isArray(p?.villages)
            ? p.villages[0]?.name
            : (p?.villages as { name?: string } | null)?.name) ?? "-", 

        // OPTIONAL
        nik: p?.nik ?? null,
        telepon: p?.telepon ?? null,
        gender: p?.jenis_kelamin ?? null,

        // ROLE & STATUS
        role: p?.app_role ?? "USER",
        status: p ? "ACTIVE" : "INCOMPLETE",

        // AUDIT
        lastSignInAt: u.last_sign_in_at ?? null,
        createdAt: u.created_at ?? null,

        // PROFILE DETAIL
        profile: p
          ? {
              alamat: p.alamat,
              tanggal_lahir: p.tanggal_lahir,
              nama_ayah: p.nama_ayah,
              nama_ibu: p.nama_ibu,
              province_id: p.province_id,
              regency_id: p.regency_id,
              district_id: p.district_id,
              village_id: p.village_id,
              avatar_path: p.avatar_path,
            }
          : null,
      };
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error("[API /users] fatal error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
