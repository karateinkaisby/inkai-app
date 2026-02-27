export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/app/lib/supabase/admin";
import { getSessionUser } from "@/app/lib/supabase/session";
import { requireSuperadmin } from "@/app/lib/security/requireSuperadmin";

/* ================= GET ================= */

export async function GET() {
  const user = await getSessionUser();
  const gate = await requireSuperadmin(user);
  if (!gate.ok) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: gate.status });
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("menus")
    .select("*")
    .order("order_index");

  if (error) {
    console.error("[menus][GET]", error);
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data ?? []);
}

/* ================= POST ================= */

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  const gate = await requireSuperadmin(user);
  if (!gate.ok) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: gate.status });
  }

  const supabase = createSupabaseAdminClient();
  try {
    const body = await req.json();

    const payload = {
      key: body.key,
      name: body.name,
      scope: body.scope ?? null,
      icon: body.icon,
      color: body.color ?? null,
      order_index: body.order_index ?? 0,
      is_active: body.is_active ?? true,
      superadmin_only: body.superadmin_only ?? false,
      required_structural_level: body.required_structural_level ?? null,
      required_functional_role: body.required_functional_role ?? null,
      context_required: body.context_required ?? false,
    };

    const { data, error } = await supabase
      .from("menus")
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error("[menus][POST]", error);
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true, data });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}

/* ================= PUT ================= */

export async function PUT(req: NextRequest) {
  const user = await getSessionUser();
  const gate = await requireSuperadmin(user);
  if (!gate.ok) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: gate.status });
  }

  const supabase = createSupabaseAdminClient();
  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json(
        { ok: false, error: "Missing menu id" },
        { status: 400 }
      );
    }

    const payload = {
      key: body.key,
      name: body.name,
      scope: body.scope ?? null,
      icon: body.icon,
      color: body.color ?? null,
      order_index: body.order_index,
      is_active: body.is_active,
      superadmin_only: body.superadmin_only,
      required_structural_level: body.required_structural_level ?? null,
      required_functional_role: body.required_functional_role ?? null,
      context_required: body.context_required ?? false,
    };

    const { error } = await supabase
      .from("menus")
      .update(payload)
      .eq("id", body.id);

    if (error) {
      console.error("[menus][PUT]", error);
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}

/* ================= DELETE (ANTI SILENT FAIL) ================= */

export async function DELETE(req: NextRequest) {
  const user = await getSessionUser();
  const gate = await requireSuperadmin(user);
  if (!gate.ok) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: gate.status });
  }

  const supabase = createSupabaseAdminClient();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { ok: false, error: "Missing menu id" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("menus")
    .delete()
    .eq("id", id)
    .select("id");

  if (error) {
    console.error("[menus][DELETE]", error);
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 400 }
    );
  }

  if (!data || data.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Menu tidak terhapus (RLS / ID invalid)" },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true, deleted: data[0].id });
}
