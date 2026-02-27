"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h1 className="text-xl font-semibold mb-2">Terjadi kesalahan</h1>
      <p className="text-gray-400 text-sm mb-6 text-center max-w-md">
        {error.message || "Something went wrong."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium"
      >
        Coba lagi
      </button>
    </div>
  );
}
