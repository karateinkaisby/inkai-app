"use client";

export default function GoldCyanFX() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Cyan Glow Left */}
      <div
        className="
          absolute left-0 top-0 h-full w-1/4 
          bg-cyan-400 opacity-[0.18] blur-2xl
        "
      />

      {/* Gold Glow Right */}
      <div
        className="
          absolute right-0 top-0 h-full w-1/4 
          bg-yellow-300 opacity-[0.15] blur-2xl
        "
      />
    </div>
  );
}
