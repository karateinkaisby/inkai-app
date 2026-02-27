// app/dashboard/modules/settings/components/database/tabs/ColumnsTab.tsx
"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser as supabase } from "@/app/lib/supabaseBrowser";

type Column = {
  column_name: string;
  data_type: string;
  is_nullable: string;
};

export default function ColumnsTab({ table }: { table: string }) {
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    const fetchColumns = async () => {
      const { data } = await supabase.rpc("get_table_columns", {
        p_table: table,
      });

      if (data) setColumns(data);
    };

    fetchColumns();
  }, [table]);

  if (!columns.length) {
    return <div className="text-sm text-white/40">No columns</div>;
  }

  return (
    <div className="flex-1 min-h-0 overflow-auto">
      <ul className="text-sm space-y-1 pr-2">
        {columns.map((c) => (
          <li key={c.column_name}>
            {c.column_name} : {c.data_type}{" "}
            {c.is_nullable === "NO" && <b>(required)</b>}
          </li>
        ))}
      </ul>
    </div>
  );
}
