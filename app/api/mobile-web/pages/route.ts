export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/app/lib/supabase/admin";
import { getSessionUser } from "@/app/lib/supabase/session";
import { requirePPAdmin } from "@/app/lib/security/requirePPAdmin";
import type { MobilePageSlug } from "@/app/lib/mobile-web/types";

export async function GET(req: NextRequest) {
  const user = await getSessionUser();
  const gate = await requirePPAdmin(user);
  if (!gate.ok) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: gate.status });
  }

  const slug = req.nextUrl.searchParams.get("slug");
  const supabase = createSupabaseAdminClient();

  let query = supabase.from("mobile_pages").select("*").order("slug");
  if (slug) query = query.eq("slug", slug);

  const { data, error } = await query;
  if (error) {
    console.error("[mobile-web/pages][GET]", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  if (slug) {
    return NextResponse.json({ ok: true, page: data?.[0] ?? null });
  }

  return NextResponse.json({ ok: true, pages: data ?? [] });
}

export async function PUT(req: NextRequest) {
  const user = await getSessionUser();
  const gate = await requirePPAdmin(user);
  if (!gate.ok) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: gate.status });
  }

  try {
    const body = await req.json();
    const slug = body.slug as MobilePageSlug | undefined;

    if (!slug) {
      return NextResponse.json({ ok: false, error: "Missing slug" }, { status: 400 });
    }

    const supabase = createSupabaseAdminClient();
    const payload = {
      title: body.title,
      subtitle: body.subtitle ?? null,
      body: body.body ?? null,
      extra: body.extra ?? {},
      is_published: body.is_published ?? true,
      updated_at: new Date().toISOString(),
      updated_by: user!.id,
    };

    const { data, error } = await supabase
      .from("mobile_pages")
      .update(payload)
      .eq("slug", slug)
      .select()
      .single();

    if (error) {
      console.error("[mobile-web/pages][PUT]", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true, page: data });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
