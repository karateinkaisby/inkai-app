// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PageTransitionProvider } from "../components/providers/TransitionProvider";
import SakuraController from "../components/SakuraController";
import { SupabaseProvider } from "@/components/providers/SupabaseProvider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "INKAI-APP",
  description: "Sistem Informasi Karate Modern",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* EFFECTS */}
        <SakuraController />

        {/* PROVIDERS */}
        <SupabaseProvider>
          <PageTransitionProvider>{children}</PageTransitionProvider>
        </SupabaseProvider>

        <Toaster position="top-center" />
      </body>
    </html>
  );
}
