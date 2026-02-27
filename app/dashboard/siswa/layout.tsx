"use client";

import { WilayahProvider } from "./contexts/WilayahContext";
import { StudentProvider } from "./contexts/StudentContext";

export default function SiswaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WilayahProvider>
      <StudentProvider>{children}</StudentProvider>
    </WilayahProvider>
  );
}
