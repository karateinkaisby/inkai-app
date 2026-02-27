"use client";

import { createContext, useContext, useState } from "react";

export type WilayahLevel = "PROVINSI" | "CABANG" | "RANTING" | "AFILIASI";

export type WilayahNode = {
  id: string;
  name: string;
  level: WilayahLevel;
};

type WilayahContextType = {
  activePath: WilayahNode[];
  setActivePath: (path: WilayahNode[]) => void;
};

const WilayahContext = createContext<WilayahContextType | null>(null);

export function WilayahProvider({ children }: { children: React.ReactNode }) {
  const [activePath, setActivePath] = useState<WilayahNode[]>([]);

  return (
    <WilayahContext.Provider value={{ activePath, setActivePath }}>
      {children}
    </WilayahContext.Provider>
  );
}

export function useWilayahContext() {
  const ctx = useContext(WilayahContext);
  if (!ctx) {
    throw new Error("useWilayahContext must be used inside WilayahProvider");
  }
  return ctx;
}
