export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getSessionUser } from "@/app/lib/supabase/session";
import { createSupabaseAdminClient } from "@/app/lib/supabase/admin";

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const admin = createSupabaseAdminClient();

  const { data: profile } = await admin
    .from("profiles")
    .select("email_allowed, app_role")
    .eq("user_id", user.id)
    .maybeSingle();

  const { data: structural } = await admin.rpc("get_user_structural_roles", {
    p_user_id: user.id,
  });

  const { data: menus } = await admin
    .from("menus")
    .select(
      "id, key, name, icon, color, order_index, is_active, scope, superadmin_only, required_structural_level, required_functional_role, context_required",
    )
    .eq("scope", "sidebar")
    .order("order_index");

  return NextResponse.json({
    user: {
      email: user.email ?? null,
      email_allowed: profile?.email_allowed ?? false,
      app_role: profile?.app_role ?? null,
      structural_roles: structural ?? [],
      functional_roles: [],
    },
    menus: menus ?? [],
  });
}

