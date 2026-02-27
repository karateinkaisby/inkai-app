// app/dashboard/components/topbar-premium/profile/settings/services/authService.ts
"use client";

import { supabaseBrowser as supabase } from "@/app/lib/supabaseBrowser";

export async function changePassword(password: string) {
  return supabase.auth.updateUser({ password });
}

export async function changeEmail(email: string) {
  return supabase.auth.updateUser({ email });
}

export async function reAuth(email: string, password: string) {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
}

/**
 * Logout dari semua device / session
 */
export async function logoutAllSessions() {
  return supabase.auth.signOut({ scope: "global" });
}
