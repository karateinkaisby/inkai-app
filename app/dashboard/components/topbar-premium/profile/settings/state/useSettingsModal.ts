"use client";

import { create } from "zustand";

type SettingsModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const useSettingsModal = create<SettingsModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useSettingsModal;
