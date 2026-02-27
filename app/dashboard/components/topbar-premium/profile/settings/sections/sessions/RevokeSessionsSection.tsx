"use client";

import { useState } from "react";
import { logoutAllSessions } from "../../services/authService";
import ConfirmDialog from "../../components/ConfirmDialog";

export default function RevokeSessionsSection() {
  const [open, setOpen] = useState(false);

  return (
    <section>
      <button
        onClick={() => setOpen(true)}
        className="text-red-400 hover:text-red-300 text-sm"
      >
        Logout dari semua perangkat
      </button>

      <ConfirmDialog
        open={open}
        title="Logout Semua Perangkat"
        message="Semua sesi login di perangkat lain akan dihentikan. Lanjutkan?"
        onCancel={() => setOpen(false)}
        onConfirm={() => {
          setOpen(false);
          logoutAllSessions();
        }}
      />
    </section>
  );
}
