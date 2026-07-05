import "server-only";

import type { User } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/app/lib/supabase/admin";
import { requireSuperadmin } from "@/app/lib/security/requireSuperadmin";

const PP_STRUCTURAL_LEVEL = 5;

type StructuralRoleRow = {
  active?: boolean;
  structural_level?: number;
};

export async function requirePPAdmin(user: User | null) {
  if (!user) return { ok: false as const, status: 401 as const };

  const superadmin = await requireSuperadmin(user);
  if (superadmin.ok) return { ok: true as const };

  const admin = createSupabaseAdminClient();
  const { data: structural, error } = await admin.rpc("get_user_structural_roles", {
    p_user_id: user.id,
  });

  if (error) return { ok: false as const, status: 403 as const };

  const roles = (structural ?? []) as StructuralRoleRow[];
  const hasPPAccess = roles.some(
    (role) =>
      role.active === true &&
      typeof role.structural_level === "number" &&
      role.structural_level >= PP_STRUCTURAL_LEVEL,
  );

  if (hasPPAccess) return { ok: true as const };
  return { ok: false as const, status: 403 as const };
}
