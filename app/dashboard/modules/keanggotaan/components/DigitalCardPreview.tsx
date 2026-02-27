"use client";
import { Anggota } from "../types/Anggota";

export default function DigitalCardWithPrint({
  anggota,
}: {
  anggota: Anggota;
}) {
  return (
    <div className="flex flex-col items-center">
      {/* KARTU DIGITAL */}
      <div
        className="
          w-full max-w-md
          rounded-2xl
          bg-slate-900
          text-white
          shadow-2xl
          border border-cyan-400/30
          p-5
        "
      >
        <div className="flex items-center gap-4">
          {/* FOTO */}
          <div className="w-14 h-14 rounded-full bg-slate-700 flex items-center justify-center text-xs">
            FOTO
          </div>

          {/* IDENTITAS (dari DB) */}
          <div className="flex-1">
            <div className="font-semibold">{anggota.nama}</div>
            <div className="text-xs opacity-80">
              No. Anggota: {anggota.nomor ?? "—"}
            </div>
            <div className="text-xs opacity-80">
              Ranting: {anggota.ranting?.nama ?? "—"}
            </div>
          </div>
        </div>

        {/* QR + AKSI */}
        <div className="mt-4 flex flex-col items-center gap-3">
          {/* QR */}
          <div className="w-24 h-24 bg-white text-black text-xs flex items-center justify-center rounded-lg">
            QR CODE
          </div>

          {/* AKSI CETAK (SATU BARIS) */}
          <div className="flex gap-3 w-full">
            <button
              className="
                flex-1
                bg-yellow-400 hover:bg-yellow-300
                text-black text-sm font-semibold
                py-2 rounded-lg
                shadow
              "
            >
              🖨️ Print
            </button>

            <button
              className="
                flex-1
                bg-cyan-500/20 hover:bg-cyan-500/30
                text-cyan-300 text-sm font-semibold
                py-2 rounded-lg
                border border-cyan-400/30
              "
            >
              📄 PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
