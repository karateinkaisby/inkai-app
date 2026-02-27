"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  password: string;
  confirm: string;
  onPassword: (v: string) => void;
  onConfirm: (v: string) => void;
};

export default function PasswordFields({
  password,
  confirm,
  onPassword,
  onConfirm,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      {/* Password baru */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password baru"
          value={password}
          onChange={(e) => onPassword(e.target.value)}
          className="w-full rounded-md bg-black/40 border border-cyan-500/30 px-3 py-2 pr-10 text-white"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-300 hover:text-cyan-100"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Konfirmasi password */}
      <div className="relative mt-3">
        <input
          type={showConfirm ? "text" : "password"}
          placeholder="Konfirmasi password"
          value={confirm}
          onChange={(e) => onConfirm(e.target.value)}
          className="w-full rounded-md bg-black/40 border border-cyan-500/30 px-3 py-2 pr-10 text-white"
        />
        <button
          type="button"
          onClick={() => setShowConfirm(!showConfirm)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-300 hover:text-cyan-100"
        >
          {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </>
  );
}
