"use client";

import Link from "next/link";

const stats = [
  {
    label: "Total Siswa",
    value: "—",
    href: "/dashboard/siswa",
    color: "from-blue-500 to-blue-700",
    icon: "👦",
  },
  {
    label: "Anggota Aktif",
    value: "—",
    href: "/dashboard/keanggotaan",
    color: "from-green-500 to-green-700",
    icon: "🥋",
  },
  {
    label: "Event Aktif",
    value: "—",
    href: "/dashboard/event",
    color: "from-purple-500 to-purple-700",
    icon: "🏆",
  },
  {
    label: "Jadwal Terdekat",
    value: "—",
    href: "/dashboard/jadwal",
    color: "from-orange-500 to-orange-700",
    icon: "📅",
  },
];

const modules = [
  {
    title: "Manajemen Siswa",
    desc: "Data siswa, status, wilayah, kartu digital",
    href: "/dashboard/siswa",
    color: "bg-blue-500",
    icon: "👦",
  },
  {
    title: "Keanggotaan",
    desc: "Kyu, Dan, mutasi, kartu anggota",
    href: "/dashboard/keanggotaan",
    color: "bg-green-500",
    icon: "🥋",
  },
  {
    title: "Absensi",
    desc: "Harian & rekap kehadiran",
    href: "/dashboard/absensi",
    color: "bg-cyan-500",
    icon: "📝",
  },
  {
    title: "Event & Ujian",
    desc: "Gashuku, kejuaraan, ujian",
    href: "/dashboard/event",
    color: "bg-purple-500",
    icon: "🏆",
  },
  {
    title: "Keuangan",
    desc: "Iuran & transaksi",
    href: "/dashboard/keuangan",
    color: "bg-emerald-500",
    icon: "💰",
  },
  {
    title: "Penilaian",
    desc: "Nilai teknik & fisik",
    href: "/dashboard/penilaian",
    color: "bg-yellow-500",
    icon: "📊",
  },
  {
    title: "Pengguna",
    desc: "User, role, permission",
    href: "/dashboard/user",
    color: "bg-rose-500",
    icon: "👤",
  },
  {
    title: "Pengaturan",
    desc: "Sistem & keamanan",
    href: "/dashboard/settings",
    color: "bg-slate-500",
    icon: "⚙️",
  },
];

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-sm text-white/60">
          Ringkasan & akses cepat sistem manajemen dojo
        </p>
      </div>

      {/* Statistik ala AdminLTE */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className={`rounded-lg p-4 text-white shadow-md bg-gradient-to-br ${s.color}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-80">{s.label}</div>
                <div className="text-2xl font-bold">{s.value}</div>
              </div>
              <div className="text-3xl opacity-80">{s.icon}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Menu Modul */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((m) => (
          <Link
            key={m.title}
            href={m.href}
            className="flex items-center gap-4 rounded-lg border border-white/10 p-4 hover:scale-[1.01] transition"
          >
            <div
              className={`h-12 w-12 flex items-center justify-center rounded-lg text-white text-2xl ${m.color}`}
            >
              {m.icon}
            </div>
            <div>
              <div className="font-semibold">{m.title}</div>
              <div className="text-sm text-white/60">{m.desc}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer Info */}
      <div className="rounded-lg border border-white/10 p-4 text-sm text-white/60">
        Tampilan dashboard bergaya AdminLTE — fokus ringkas, visual jelas, dan
        akses cepat ke seluruh modul.
      </div>
    </div>
  );
}
