"use client";

import { useEffect, useRef } from "react";

/**
 * useAutoSave (FINAL – AVATAR SAFE)
 * ----------------------------------
 * - Autosave debounce
 * - PAUSE saat avatarDirty === true
 * - Skip initial load
 * - Aman untuk wizard step 1
 */
export default function useAutoSave(
  watch: {
    avatarDirty?: boolean;
  },
  saveFn: () => void,
  enabled: boolean = true,
  delay: number = 1200
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firstRun = useRef(true);

  useEffect(() => {
    if (!enabled) return;

    // ⛔ STOP autosave jika avatar belum stabil
    if (watch?.avatarDirty) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    // ⛔ Skip initial mount (hindari autosave setelah load DB)
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    // clear timer lama
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // debounce save
    timerRef.current = setTimeout(() => {
      saveFn();
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, enabled, delay]);
}
