"use client";

import { useStudentContext } from "../../contexts/StudentContext";

export function StudentDetailPanel() {
  const { selectedStudent } = useStudentContext();

  if (!selectedStudent) {
    return (
      <div className="h-full flex items-center justify-center text-sm text-gray-500">
        Pilih siswa untuk melihat detail
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold">{selectedStudent.name}</h2>
        <p className="text-sm text-gray-400">
          Sabuk {selectedStudent.belt} ({selectedStudent.beltLevel})
        </p>
        <p className="text-xs text-gray-500">ID: {selectedStudent.id}</p>
      </div>

      {/* Status */}
      <div>
        <span className="inline-block px-3 py-1 text-xs rounded bg-slate-700">
          {selectedStudent.status}
        </span>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2">
        <button className="rounded bg-slate-700 py-2 text-xs hover:bg-slate-600">
          Edit
        </button>
        <button className="rounded bg-slate-700 py-2 text-xs hover:bg-slate-600">
          Absensi
        </button>
        <button className="rounded bg-slate-700 py-2 text-xs hover:bg-slate-600">
          Penilaian
        </button>
        <button className="rounded bg-slate-700 py-2 text-xs hover:bg-slate-600">
          Event
        </button>
      </div>
    </div>
  );
}
