"use client";

import { useEffect, useMemo, useState } from "react";
import { supabaseBrowser as supabase } from "@/app/lib/supabaseBrowser";

/**
 * RULE OTOMATIS
 * - EXCLUDE tabel sistem Supabase
 * - EXCLUDE partisi / arsip (messages_YYYY_MM_DD)
 */
const SYSTEM_PREFIXES = [
  "auth_",
  "mfa_",
  "oauth_",
  "saml_",
  "sso_",
  "pg_",
  "realtime_",
  "storage_",
  "supabase_",
];

const SYSTEM_TABLES_EXACT = [
  "buckets",
  "buckets_analytics",
  "buckets_vectors",
  "objects",
  "events",
  "flow_state",
  "identities",
  "instances",
  "messages",
  "migrations",
  "schema_migrations",
  "secrets",
  "refresh_tokens",
  "one_time_tokens",
  "password_resets",
  "vector_indexes",
  "prefixes",
];

type TableStat = {
  table_name: string;
  estimated_rows: number;
};

const isAppTable = (name: string) => {
  if (SYSTEM_TABLES_EXACT.includes(name)) return false;
  if (SYSTEM_PREFIXES.some((p) => name.startsWith(p))) return false;
  if (/^messages_\d{4}_\d{2}_\d{2}$/.test(name)) return false;
  return true;
};

export default function DatabaseList({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (t: string) => void;
}) {
  const [tables, setTables] = useState<TableStat[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTables = async () => {
      //   console.group("[DB] Fetch table stats");

      const { data, error } = await supabase.rpc("get_table_stats");

      if (error || !data) {
        //   console.error("[DB] RPC error", error);
        // console.groupEnd();
        return;
      }

      const appTables = (data as TableStat[]).filter((t) =>
        isAppTable(t.table_name),
      );

      setTables(appTables);
      // console.groupEnd();
    };

    fetchTables();
  }, []);

  const visibleTables = useMemo(() => {
    return tables.filter((t) =>
      t.table_name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [tables, search]);

  return (
    <div className="p-3 space-y-1">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search table…"
        className="w-full mb-2 px-2 py-1 text-sm bg-black/30 border border-white/10 rounded"
      />

      {visibleTables.map((t) => (
        <button
          key={t.table_name}
          onClick={() => onSelect(t.table_name)}
          className={`w-full text-left px-2 py-2 rounded text-sm flex justify-between items-center ${
            selected === t.table_name
              ? "bg-emerald-500/20 text-white"
              : "text-white/60 hover:bg-white/5"
          }`}
        >
          <span>{t.table_name}</span>
          <span className="text-xs text-white/40">{t.estimated_rows}</span>
        </button>
      ))}
    </div>
  );
}
