"use client";

import { StudentCard } from "../StudentCard";
import { useStudentContext } from "../../contexts/StudentContext";

export function StudentList() {
  const { students, loading, selectedStudent, selectStudent } =
    useStudentContext();

  if (loading) return <p className="text-sm text-gray-400">Loading siswa...</p>;
  if (!students.length)
    return <p className="text-sm text-gray-400">Tidak ada siswa</p>;

  return (
    <div className="space-y-2">
      {students.map((s) => (
        <div
          key={s.id}
          onClick={() => selectStudent(s)}
          className={`cursor-pointer rounded-xl transition
            ${
              selectedStudent?.id === s.id
                ? "ring-2 ring-cyan-500/40 bg-slate-800"
                : "hover:bg-slate-800/60"
            }`}
        >
          <StudentCard student={s} />
        </div>
      ))}
    </div>
  );
}
