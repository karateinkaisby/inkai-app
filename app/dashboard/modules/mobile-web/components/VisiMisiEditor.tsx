"use client";

import { useEffect, useState } from "react";
import type { MobilePageRow } from "@/app/lib/mobile-web/types";
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

export default function VisiMisiEditor({ page, onSave }: Props) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [visi, setVisi] = useState("");
  const [misi, setMisi] = useState<string[]>([]);
  const [isPublished, setIsPublished] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!page) return;
    setTitle(page.title ?? "");
    setSubtitle(page.subtitle ?? "");
    setVisi(typeof page.extra?.visi === "string" ? page.extra.visi : "");
    setMisi(Array.isArray(page.extra?.misi) ? (page.extra.misi as string[]) : []);
    setIsPublished(page.is_published ?? true);
  }, [page]);

  async function handleSave() {
    try {
      setSaving(true);
      await onSave({
        title,
        subtitle,
        body: null,
        is_published: isPublished,
        extra: { visi, misi: misi.filter((item) => item.trim()) },
      });
    } finally {
      setSaving(false);
    }
  }

  if (!page) {
    return <div className="text-sm text-white/50">Memuat data visi & misi...</div>;
  }

  return (
    <div className="space-y-4">
      <SectionCard title="Informasi Halaman">
        <div className="grid gap-3 md:grid-cols-2">
          <TextInput label="Judul" value={title} onChange={setTitle} />
          <TextInput label="Subjudul" value={subtitle} onChange={setSubtitle} />
        </div>
        <CheckboxField
          label="Publikasikan halaman"
          checked={isPublished}
          onChange={setIsPublished}
        />
      </SectionCard>

      <SectionCard title="Visi">
        <TextArea label="Visi" value={visi} onChange={setVisi} rows={4} />
      </SectionCard>

      <SectionCard
        title="Misi"
        action={
          <button
            type="button"
            onClick={() => setMisi((prev) => [...prev, ""])}
            className="text-xs px-2 py-1 rounded bg-emerald-600/80 hover:bg-emerald-500"
          >
            + Tambah Misi
          </button>
        }
      >
        <div className="space-y-2">
          {misi.map((item, index) => (
            <div key={index} className="flex gap-2 items-start">
              <span className="text-xs text-white/40 mt-3 w-6">{index + 1}.</span>
              <div className="flex-1">
                <TextArea
                  label={`Misi ${index + 1}`}
                  value={item}
                  onChange={(v) =>
                    setMisi((prev) => prev.map((row, i) => (i === index ? v : row)))
                  }
                  rows={2}
                />
              </div>
              <button
                type="button"
                onClick={() => setMisi((prev) => prev.filter((_, i) => i !== index))}
                className="text-xs text-red-400 hover:text-red-300 mt-7"
              >
                Hapus
              </button>
            </div>
          ))}
          {misi.length === 0 && (
            <div className="text-sm text-white/40">Belum ada poin misi.</div>
          )}
        </div>
      </SectionCard>

      <SaveButton saving={saving} onClick={handleSave} />
    </div>
  );
}
