export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/app/lib/supabase/session";
import { requireSuperadmin } from "@/app/lib/security/requireSuperadmin";
import {
  getUserPermissions,
  saveUserPermissions,
} from "@/app/lib/supabasePermissions";

/* ===============================
 * GET
 * =============================== */
export async function GET(req: NextRequest) {
  const me = await getSessionUser();
  const gate = await requireSuperadmin(me);
  if (!gate.ok) {
    return NextResponse.json({ permissions: {} }, { status: gate.status });
  }

  const email = new URL(req.url).searchParams.get("email");
  if (!email) return NextResponse.json({ permissions: {} });

  const permissions = await getUserPermissions(email);
  return NextResponse.json({ permissions });
}

/* ===============================
 * POST
 * =============================== */
export async function POST(req: NextRequest) {
  const me = await getSessionUser();
  const gate = await requireSuperadmin(me);
  if (!gate.ok) {
    return NextResponse.json({ ok: false }, { status: gate.status });
  }

  const { email, permissions } = await req.json();
  if (!email || !permissions) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  await saveUserPermissions(email, permissions);
  return NextResponse.json({ ok: true });
}
