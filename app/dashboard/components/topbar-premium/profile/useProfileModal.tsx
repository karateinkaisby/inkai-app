"use client";

import { create } from "zustand";

interface ProfileModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const useProfileModal = create<ProfileModalState>((set) => ({
  isOpen: false,

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () =>
    set((state) => ({
      isOpen: !state.isOpen,
    })),
}));

export default useProfileModal;
