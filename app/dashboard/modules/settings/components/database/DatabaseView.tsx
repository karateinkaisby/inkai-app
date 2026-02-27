"use client";

import { useState } from "react";
import DatabaseList from "./DatabaseList";
import DatabaseDetail from "./DatabaseDetail";

export default function DatabaseView() {
  const [table, setTable] = useState<string | null>(null);

  return (
    <div className="flex h-full min-h-0 border border-white/10 rounded-lg overflow-hidden">
      <aside className="w-64 border-r border-white/10 overflow-y-auto">
        <DatabaseList selected={table} onSelect={setTable} />
      </aside>

      <main className="flex-1 p-4 flex flex-col min-h-0 overflow-hidden">
        {!table ? (
          <div className="flex-1 flex items-center justify-center text-white/40">
            Pilih tabel untuk melihat detail
          </div>
        ) : (
          <div className="flex-1 min-h-0 overflow-hidden">
            <DatabaseDetail table={table} />
          </div>
        )}
      </main>
    </div>
  );
}
