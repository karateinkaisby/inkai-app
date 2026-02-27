// app/dashboard/modules/settings/components/database/tabs/ActivityTab.tsx
"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser as supabase } from "@/app/lib/supabaseBrowser";

type LogRow = {
  id: string;
  action: string;
  table_name: string;
  actor: string;
  created_at: string;
};

export default function ActivityTab({ table }: { table: string }) {
  const [logs, setLogs] = useState<LogRow[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const { data } = await supabase
        .from("audit_log_entries")
        .select("id, action, table_name, actor, created_at")
        .eq("table_name", table)
        .order("created_at", { ascending: false })
        .limit(20);

      if (data) setLogs(data);
    };

    fetchLogs();
  }, [table]);

  if (!logs.length) {
    return <div className="text-sm text-white/40">No activity</div>;
  }

  return (
    <div className="flex-1 min-h-0 overflow-auto pr-2">
      <div className="space-y-2 text-sm">
        {logs.map((l) => (
          <div key={l.id}>
            <b>{new Date(l.created_at).toLocaleTimeString()}</b>{" "}
            {l.action.toUpperCase()} <b>{l.table_name}</b> by {l.actor}
          </div>
        ))}
      </div>
    </div>
  );
}
