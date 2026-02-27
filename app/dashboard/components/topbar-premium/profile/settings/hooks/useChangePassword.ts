"use client";

import { useState } from "react";
import { changePassword } from "../services/authService";
import { useToast } from "@/app/dashboard/components/topbar-premium/profile/settings/ui";

export function useChangePassword() {
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(password: string, confirm: string) {
    setSuccess(false);
    setError(null);

    if (!password || !confirm) {
      const msg = "Password baru dan konfirmasi Password wajib diisi";
      setError(msg);
      toast.show({ message: msg, type: "error" });
      return;
    }

    if (password.length < 6) {
      const msg = "Password minimal 6 karakter";
      setError(msg);
      toast.show({ message: msg, type: "error" });
      return;
    }

    if (password !== confirm) {
      const msg = "Konfirmasi password tidak cocok";
      setError(msg);
      toast.show({ message: msg, type: "error" });
      return;
    }

    setLoading(true);
    const { error: err } = await changePassword(password);
    setLoading(false);

    if (err) {
      setError(err.message);
      toast.show({
        message: err.message,
        type: "error",
      });
      return;
    }

    setError(null);
    toast.show({
      message: "Password berhasil diubah",
      type: "success",
    });

    setSuccess(true);
  }

  return { submit, loading, success, error };
}
