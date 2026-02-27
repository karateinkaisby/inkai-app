"use client";

export default function HologramScanline() {
  return (
    <div
      className="
        pointer-events-none absolute inset-0 opacity-[0.07]
        bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.15)_0px,rgba(255,255,255,0.15)_1px,transparent_1px,transparent_3px)]
      "
    />
  );
}
