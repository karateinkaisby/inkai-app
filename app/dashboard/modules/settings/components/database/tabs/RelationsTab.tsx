// app/dashboard/modules/settings/components/database/tabs/RelationsTab.tsx
"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser as supabase } from "@/app/lib/supabaseBrowser";

type Relation = {
  column_name: string;
  foreign_table: string;
  foreign_column: string;
};

export default function RelationsTab({ table }: { table: string }) {
  const [relations, setRelations] = useState<Relation[]>([]);

  useEffect(() => {
    const fetchRelations = async () => {
      const { data } = await supabase.rpc("get_table_relations", {
        p_table: table,
      });

      if (data) setRelations(data);
    };

    fetchRelations();
  }, [table]);

  if (!relations.length) {
    return <div className="text-sm text-white/40">No relations</div>;
  }

  return (
    <div className="flex-1 min-h-0 overflow-auto">
      <ul className="text-sm space-y-1 pr-2">
        {relations.map((r, i) => (
          <li key={i}>
            {table}.{r.column_name} → {r.foreign_table}.{r.foreign_column}
          </li>
        ))}
      </ul>
    </div>
  );
}
