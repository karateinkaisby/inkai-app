"use client";

import { useEffect, useState } from "react";
import type { MaknaItem, MobilePageRow } from "@/app/lib/mobile-web/types";
import {
  CheckboxField,
  SaveButton,
  SectionCard,
  TextArea,
  TextInput,
} from "./FormFields";

type Props = {
  page: MobilePageRow | undefined;
  onSave: (payload: Partial<MobilePageRow>) => Promise<void>;
};

const emptyItem = (): MaknaItem => ({ symbol: "", meaning: "" });

export default function MaknaLambangEditor({ page, onSave }: Props) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");
  const [items, setItems] = useState<MaknaItem[]>([]);
  const [isPublished, setIsPublished] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!page) return;
    setTitle(page.title ?? "");
    setSubtitle(page.subtitle ?? "");
    setBody(page.body ?? "");
    setItems(
      Array.isArray(page.extra?.items) ? (page.extra.items as MaknaItem[]) : [],
    );
    setIsPublished(page.is_published ?? true);
  }, [page]);

  async function handleSave() {
    try {
      setSaving(true);
      await onSave({
        title,
        subtitle,
        body,
        is_published: isPublished,
        extra: { items },
      });
    } finally {
      setSaving(false);
    }
  }

  if (!page) {
    return <div className="text-sm text-white/50">Memuat data makna lambang...</div>;
  }

  return (
    <div className="space-y-4">
      <SectionCard title="Informasi Halaman">
        <div className="grid gap-3 md:grid-cols-2">
          <TextInput label="Judul" value={title} onChange={setTitle} />
          <TextInput label="Subjudul" value={subtitle} onChange={setSubtitle} />
        </div>
        <TextArea label="Pendahuluan" value={body} onChange={setBody} rows={4} />
        <CheckboxField
          label="Publikasikan halaman"
          checked={isPublished}
          onChange={setIsPublished}
        />
      </SectionCard>

      <SectionCard
        title="Simbol & Makna"
        action={
          <button
            type="button"
            onClick={() => setItems((prev) => [...prev, emptyItem()])}
            className="text-xs px-2 py-1 rounded bg-emerald-600/80 hover:bg-emerald-500"
          >
            + Tambah
          </button>
        }
      >
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="rounded-md border border-white/10 p-3 space-y-2 bg-black/10"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/40">Simbol #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => setItems((prev) => prev.filter((_, i) => i !== index))}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Hapus
                </button>
              </div>
              <TextInput
                label="Nama Simbol"
                value={item.symbol}
                onChange={(v) =>
                  setItems((prev) =>
                    prev.map((row, i) => (i === index ? { ...row, symbol: v } : row)),
                  )
                }
              />
              <TextArea
                label="Makna"
                value={item.meaning}
                onChange={(v) =>
                  setItems((prev) =>
                    prev.map((row, i) => (i === index ? { ...row, meaning: v } : row)),
                  )
                }
                rows={3}
              />
            </div>
          ))}
        </div>
      </SectionCard>

      <SaveButton saving={saving} onClick={handleSave} />
    </div>
  );
}
