"use client";

import { useState } from "react";

export default function ChangePasswordPanel({
  email,
  userId,
}: {
  email: string;
  userId: string;
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [forceLogout, setForceLogout] = useState(false);
  const [loading, setLoading] = useState(false);

  const valid =
    currentPassword.length >= 1 && password.length >= 8 && password === confirm;

  const submit = async () => {
    setLoading(true);

    await fetch("/api/admin/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        currentPassword,
        newPassword: password,
        signOut: forceLogout,
      }),
    });

    setCurrentPassword("");
    setPassword("");
    setConfirm("");
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      {/* EMAIL */}
      <div>
        <label className="text-xs text-white/60">Email</label>
        <input
          value={email}
          disabled
          className="w-full mt-1 px-3 py-2 bg-white/5 rounded text-sm"
        />
      </div>

      {/* PASSWORD SAAT INI */}
      <div>
        <label className="text-xs text-white/60">Password Saat Ini</label>
        <div className="relative mt-1">
          <input
            type={showCurrent ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-3 py-2 pr-10 bg-white/5 rounded text-sm"
          />
          <button
            type="button"
            onClick={() => setShowCurrent((v) => !v)}
            className="absolute inset-y-0 right-2 flex items-center text-white/40 hover:text-white"
          >
            {showCurrent ? "🙈" : "👁"}
          </button>
        </div>
      </div>

      {/* PASSWORD BARU */}
      <div>
        <label className="text-xs text-white/60">Password Baru</label>
        <div className="relative mt-1">
          <input
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 pr-10 bg-white/5 rounded text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPass((v) => !v)}
            className="absolute inset-y-0 right-2 flex items-center text-white/40 hover:text-white"
          >
            {showPass ? "🙈" : "👁"}
          </button>
        </div>
      </div>

      {/* KONFIRMASI */}
      <div>
        <label className="text-xs text-white/60">Konfirmasi Password</label>
        <div className="relative mt-1">
          <input
            type={showConfirm ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full px-3 py-2 pr-10 bg-white/5 rounded text-sm"
          />
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            className="absolute inset-y-0 right-2 flex items-center text-white/40 hover:text-white"
          >
            {showConfirm ? "🙈" : "👁"}
          </button>
        </div>
      </div>

      {/* FORCE LOGOUT */}
      <label className="flex items-center gap-2 text-xs text-white/70">
        <input
          type="checkbox"
          checked={forceLogout}
          onChange={(e) => setForceLogout(e.target.checked)}
        />
        Force logout semua sesi
      </label>

      {/* SUBMIT */}
      <button
        disabled={!valid || loading}
        onClick={submit}
        className="w-full py-2 rounded bg-emerald-600 text-sm disabled:opacity-40"
      >
        Simpan Password
      </button>
    </div>
  );
}
