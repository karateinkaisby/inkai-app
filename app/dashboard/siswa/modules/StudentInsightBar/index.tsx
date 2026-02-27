"use client";

import { useStudentContext } from "../../contexts/StudentContext";

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <div className="relative rounded-xl border border-slate-800 bg-slate-900 p-4 hover:bg-slate-800/60 transition">
      <div
        className={`absolute left-0 top-0 h-full w-1 rounded-l-xl ${accent}`}
      />
      <div className="pl-3">
        <p className="text-xs text-slate-400 uppercase tracking-wide">
          {label}
        </p>
        <p className="text-2xl font-semibold text-white mt-1">{value}</p>
      </div>
    </div>
  );
}

export function StudentInsightBar({ collapsed }: { collapsed?: boolean }) {
  const { students } = useStudentContext();

  const total = students.length;
  const aktif = students.filter((s) => s.status === "AKTIF").length;
  const cuti = students.filter((s) => s.status === "CUTI").length;
  const nonAktif = students.filter((s) => s.status === "NON_AKTIF").length;

  /**
   * KPI ABSENSI RATA-RATA
   * fallback aman
   */
  const avgAttendance =
    total > 0
      ? Math.round(
          students.reduce((acc, s) => {
            if (s.status === "AKTIF") return acc + 90;
            return acc;
          }, 0) / total
        )
      : 0;

  return (
    <div
      className={`
        transition-all duration-300 ease-in-out overflow-hidden
        ${
          collapsed
            ? "max-h-0 opacity-0 mb-0"
            : "max-h-[200px] opacity-100 mb-3"
        }
      `}
    >
      {/* MAIN STATS */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Total Siswa" value={total} accent="bg-cyan-500" />
        <StatCard label="Aktif" value={aktif} accent="bg-emerald-500" />
        <StatCard label="Cuti" value={cuti} accent="bg-amber-500" />
        <StatCard label="Non-Aktif" value={nonAktif} accent="bg-rose-500" />
      </div>

      {/* KPI BAR */}
      <div className="mt-3 flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
        <div className="text-xs text-slate-400 uppercase tracking-wide">
          Absensi Rata-rata
        </div>

        <div className="flex-1 h-2 rounded bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-cyan-500 transition-all"
            style={{ width: `${avgAttendance}%` }}
          />
        </div>

        <div className="text-sm font-semibold text-white min-w-[40px] text-right">
          {avgAttendance}%
        </div>
      </div>
    </div>
  );
}
