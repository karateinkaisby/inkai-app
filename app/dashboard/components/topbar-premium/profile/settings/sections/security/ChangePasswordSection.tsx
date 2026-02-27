"use client";

import { useState } from "react";
import { useChangePassword } from "../../hooks/useChangePassword";
import PasswordFields from "./PasswordFields";

export default function ChangePasswordSection() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const { submit, loading, error, success } = useChangePassword();

  return (
    <section>
      <h3 className="text-cyan-300 text-sm mb-2">Keamanan</h3>

      <div className="space-y-2">
        <PasswordFields
          password={password}
          confirm={confirm}
          onPassword={setPassword}
          onConfirm={setConfirm}
        />

        {error && <div className="text-red-400 text-xs">{error}</div>}
        {success && (
          <div className="text-green-400 text-xs">
            Password berhasil diperbarui
          </div>
        )}

        <button
          onClick={() => submit(password, confirm)}
          disabled={loading}
          className="
            w-full py-2 rounded-md
            bg-cyan-600/80 hover:bg-cyan-600
            text-black font-semibold text-sm
          "
        >
          {loading ? "Menyimpan..." : "Simpan Password"}
        </button>
      </div>
    </section>
  );
}
