"use client";

export default function HologramBorder() {
  return (
    <div
      className="
        pointer-events-none absolute inset-0 rounded-md
        border border-transparent
        [border-image:linear-gradient(90deg,rgba(0,255,255,0.5),rgba(255,215,0,0.4),rgba(0,255,255,0.5))_1]
        opacity-60
      "
    />
  );
}
