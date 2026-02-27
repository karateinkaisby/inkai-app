"use client";

export default function DevelopingPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[75vh] text-center select-none">
      <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 tracking-wide">
        Modul Dalam Tahap Pengembangan
      </h1>

      <p className="mt-4 text-cyan-300/70 max-w-md leading-relaxed">
        Fitur ini sedang disiapkan dan akan hadir pada pembaruan selanjutnya.
        Terima kasih sudah menggunakan INKAI-App.
      </p>

      <div className="mt-10 animate-pulse text-cyan-500/70 text-sm">
        JARVIS Mode • Standby
      </div>
    </div>
  );
}
