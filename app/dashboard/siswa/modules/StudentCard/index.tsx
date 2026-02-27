"use client";

import { Student } from "../../types/student";

export function StudentCard({ student }: { student: Student }) {
  return (
    <div className="flex justify-between items-center p-3 rounded-xl bg-white dark:bg-slate-800 shadow">
      <div>
        <p className="font-semibold">{student.name}</p>
        <p className="text-xs text-gray-500">
          Sabuk {student.belt} ({student.beltLevel})
        </p>
        <p className="text-xs text-gray-400">ID: {student.id}</p>
      </div>
      <span className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700">
        {student.status}
      </span>
    </div>
  );
}
