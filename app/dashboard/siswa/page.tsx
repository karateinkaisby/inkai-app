"use client";

import { useRef, useState } from "react";

import WilayahExplorer from "./modules/WilayahExplorer";
import { StudentInsightBar } from "./modules/StudentInsightBar";
import { StudentFilters } from "./modules/StudentFilters";
import { StudentList } from "./modules/StudentList";
import { StudentDetailPanel } from "./modules/StudentDetailPanel";
import { useStudentContext } from "./contexts/StudentContext";

function NonAktifStudentPanel() {
  const { students } = useStudentContext();
  const nonAktifStudents = students.filter((s) => s.status === "NON_AKTIF");

  return (
    <div className="mt-4 rounded-xl bg-slate-900 border border-slate-800">
      <div className="px-4 py-2 border-b border-slate-800 text-sm font-semibold text-rose-400">
        Siswa Tidak Aktif ({nonAktifStudents.length})
      </div>
      <div className="max-h-[240px] overflow-y-auto divide-y divide-slate-800">
        {nonAktifStudents.length === 0 ? (
          <div className="p-4 text-xs text-slate-500">
            Tidak ada siswa non-aktif
          </div>
        ) : (
          nonAktifStudents.map((s) => (
            <div key={s.id} className="px-4 py-2 text-sm">
              <div className="font-medium">{s.name}</div>
              <div className="text-xs text-slate-500">
                {s.belt} • {s.beltLevel}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const onScroll = () => {
    if (!scrollRef.current) return;
    const y = scrollRef.current.scrollTop;
    setCollapsed(y > 40);
    setScrolled(y > 4);
  };

  return (
    <div className="grid grid-cols-12 gap-4 h-full">
      {/* LEFT */}
      <div className="col-span-2">
        <div className="rounded-xl bg-slate-900 border border-slate-800">
          <WilayahExplorer />
        </div>
      </div>

      {/* CENTER */}
      <div className="col-span-6 flex flex-col min-h-0">
        <div
          className={`sticky top-0 z-30 bg-[#0b0b0b] ${
            scrolled ? "shadow-lg shadow-black/40" : ""
          }`}
        >
          <StudentInsightBar collapsed={collapsed} />
          <StudentFilters />
        </div>

        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="flex-1 overflow-y-auto space-y-4 pr-1"
        >
          <StudentList />
        </div>
      </div>

      {/* RIGHT */}
      <div className="col-span-4">
        <div className="rounded-xl bg-slate-900 border border-slate-800">
          <StudentDetailPanel />
        </div>
        <NonAktifStudentPanel />
      </div>
    </div>
  );
}
