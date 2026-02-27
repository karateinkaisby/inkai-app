import {
  LayoutDashboard,
  Users,
  User,
  Calendar,
  Award,
  ScrollText,
  ClipboardList,
  Wallet,
  Settings,
  IdCard,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ===============================
 * MENU KEY TYPE
 * =============================== */
export type MenuKey =
  | "dashboard"
  | "keanggotaan"
  | "siswa"
  | "user"
  | "absensi"
  | "jadwal"
  | "penilaian"
  | "keuangan"
  | "event"
  | "settings";

/* ===============================
 * MENU ITEM TYPE (RBAC READY)
 * =============================== */
export type MenuItem = {
  key: MenuKey;
  name: string;
  icon: LucideIcon;
  scope: string;

  /** UI Color (Tailwind / Neon Ready) */
  color: string;

  requiresRead?: boolean;
  superadminOnly?: boolean;
};

/* ===============================
 * MENU CONFIG (COLORFULL + RBAC)
 * =============================== */
const menuConfig: Readonly<MenuItem[]> = Object.freeze([
  {
    key: "dashboard",
    name: "Dashboard",
    scope: "dashboard",
    icon: LayoutDashboard,
    color: "text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]",
    requiresRead: true,
  },
  {
    key: "keanggotaan",
    name: "Keanggotaan",
    scope: "keanggotaan",
    icon: IdCard,
    color: "text-indigo-400 drop-shadow-[0_0_6px_rgba(129,140,248,0.6)]",
    requiresRead: true,
  },
  {
    key: "siswa",
    name: "Siswa",
    scope: "siswa",
    icon: Users,
    color: "text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.6)]",
    requiresRead: true,
    superadminOnly: true,
  },
  {
    key: "user",
    name: "User",
    scope: "user",
    icon: User,
    color: "text-teal-400 drop-shadow-[0_0_6px_rgba(45,212,191,0.6)]",
    requiresRead: true,
    superadminOnly: true,
  },
  {
    key: "absensi",
    name: "Absensi",
    scope: "absensi",
    icon: ClipboardList,
    color: "text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]",
    requiresRead: true,
  },
  {
    key: "jadwal",
    name: "Jadwal Latihan",
    scope: "jadwal",
    icon: Calendar,
    color: "text-orange-400 drop-shadow-[0_0_6px_rgba(251,146,60,0.6)]",
    requiresRead: true,
  },
  {
    key: "penilaian",
    name: "Penilaian",
    scope: "penilaian",
    icon: Award,
    color: "text-pink-400 drop-shadow-[0_0_6px_rgba(244,114,182,0.6)]",
    requiresRead: true,
    superadminOnly: true,
  },
  {
    key: "keuangan",
    name: "Keuangan",
    scope: "keuangan",
    icon: Wallet,
    color: "text-lime-400 drop-shadow-[0_0_6px_rgba(163,230,53,0.6)]",
    requiresRead: true,
    superadminOnly: true,
  },
  {
    key: "event",
    name: "Event & Pertandingan",
    scope: "event",
    icon: ScrollText,
    color: "text-purple-400 drop-shadow-[0_0_6px_rgba(192,132,252,0.6)]",
    requiresRead: true,
  },
  {
    key: "settings",
    name: "Settings",
    scope: "settings",
    icon: Settings,
    color: "text-red-400 drop-shadow-[0_0_6px_rgba(248,113,113,0.6)]",
    requiresRead: true,
    superadminOnly: true,
  },
]);

export default menuConfig;
