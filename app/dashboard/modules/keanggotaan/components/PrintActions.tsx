"use client";

export default function PrintActions() {
  return (
    <div className="mt-4 flex flex-col gap-3 items-center">
      <button
        className="
        w-full max-w-md
        bg-yellow-400 hover:bg-yellow-300
        text-black font-semibold
        py-3 rounded-xl
        shadow-lg
      "
      >
        🖨️ Print Kartu
      </button>

      <button
        className="
        text-sm text-cyan-300 hover:text-cyan-200
        underline
      "
      >
        📄 Print PDF
      </button>
    </div>
  );
}
