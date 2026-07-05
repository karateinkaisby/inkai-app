export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/app/lib/supabase/admin";
import { getSessionUser } from "@/app/lib/supabase/session";
import { requirePPAdmin } from "@/app/lib/security/requirePPAdmin";

export async function GET() {
  const user = await getSessionUser();
  const gate = await requirePPAdmin(user);
  if (!gate.ok) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: gate.status });
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("mobile_carousel_items")
    .select("*")
    .order("order_index");

  if (error) {
    console.error("[mobile-web/carousels][GET]", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, carousels: data ?? [] });
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  const gate = await requirePPAdmin(user);
  if (!gate.ok) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: gate.status });
  }

  try {
    const body = await req.json();
    if (!body.image_url) {
      return NextResponse.json({ ok: false, error: "image_url wajib diisi" }, { status: 400 });
    }

    const supabase = createSupabaseAdminClient();
    const payload = {
      title: body.title ?? null,
      description: body.description ?? null,
      image_url: body.image_url,
      link_url: body.link_url ?? null,
      order_index: body.order_index ?? 0,
      is_active: body.is_active ?? true,
      updated_at: new Date().toISOString(),
      updated_by: user!.id,
    };

    const { data, error } = await supabase
      .from("mobile_carousel_items")
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error("[mobile-web/carousels][POST]", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true, carousel: data });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const user = await getSessionUser();
  const gate = await requirePPAdmin(user);
  if (!gate.ok) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: gate.status });
  }

  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });
    }

    const supabase = createSupabaseAdminClient();
    const payload = {
      title: body.title ?? null,
      description: body.description ?? null,
      image_url: body.image_url,
      link_url: body.link_url ?? null,
      order_index: body.order_index ?? 0,
      is_active: body.is_active ?? true,
      updated_at: new Date().toISOString(),
      updated_by: user!.id,
    };

    const { data, error } = await supabase
      .from("mobile_carousel_items")
      .update(payload)
      .eq("id", body.id)
      .select()
      .single();

    if (error) {
      console.error("[mobile-web/carousels][PUT]", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true, carousel: data });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const user = await getSessionUser();
  const gate = await requirePPAdmin(user);
  if (!gate.ok) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: gate.status });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("mobile_carousel_items")
    .delete()
    .eq("id", id)
    .select("id");

  if (error) {
    console.error("[mobile-web/carousels][DELETE]", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  }

  if (!data?.length) {
    return NextResponse.json({ ok: false, error: "Item tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, deleted: data[0].id });
}
