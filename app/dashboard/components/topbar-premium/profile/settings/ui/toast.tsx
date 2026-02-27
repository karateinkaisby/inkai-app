"use client";

import { create } from "zustand";

type Toast = {
  message: string;
  type?: "success" | "error";
};

type ToastState = {
  toast: Toast | null;
  show: (t: Toast) => void;
};

export const useToast = create<ToastState>((set) => ({
  toast: null,
  show: (t) => {
    set({ toast: t });
    setTimeout(() => set({ toast: null }), 3000);
  },
}));

export function ToastContainer() {
  const { toast } = useToast();

  if (!toast) return null;

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-[200000]
        px-4 py-2 rounded-md text-sm
        shadow-lg
        ${
          toast.type === "error"
            ? "bg-red-600 text-white"
            : "bg-cyan-600 text-black"
        }
      `}
    >
      {toast.message}
    </div>
  );
}
