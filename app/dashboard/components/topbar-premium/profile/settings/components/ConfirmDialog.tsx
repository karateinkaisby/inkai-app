"use client";

export default function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200000] bg-black/60 flex items-center justify-center">
      <div
        className="w-full max-w-sm rounded-lg p-5
        bg-[#0e0e0e] border border-cyan-500/30
        shadow-[0_0_30px_-10px_rgba(0,255,255,0.5)]
      "
      >
        <h3 className="text-cyan-300 mb-2">{title}</h3>
        <p className="text-sm text-white/70 mb-4">{message}</p>

        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="text-white/50 hover:text-white">
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="bg-cyan-600 text-black px-4 py-1 rounded"
          >
            Ya, Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
}
