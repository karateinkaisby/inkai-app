"use client";

import { useEffect, useState } from "react";
import type { MobilePageRow, TimelineItem } from "@/app/lib/mobile-web/types";
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

const emptyTimeline = (): TimelineItem => ({
  year: "",
  title: "",
  description: "",
});

export default function SejarahEditor({ page, onSave }: Props) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [isPublished, setIsPublished] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!page) return;
    setTitle(page.title ?? "");
    setSubtitle(page.subtitle ?? "");
    setBody(page.body ?? "");
    setTimeline(
      Array.isArray(page.extra?.timeline)
        ? (page.extra.timeline as TimelineItem[])
        : [],
    );
    setIsPublished(page.is_published ?? true);
  }, [page]);

  function updateTimeline(index: number, field: keyof TimelineItem, value: string) {
    setTimeline((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  }

  async function handleSave() {
    try {
      setSaving(true);
      await onSave({
        title,
        subtitle,
        body,
        is_published: isPublished,
        extra: { timeline },
      });
    } finally {
      setSaving(false);
    }
  }

  if (!page) {
    return <div className="text-sm text-white/50">Memuat data sejarah...</div>;
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
        title="Timeline Sejarah"
        action={
          <button
            type="button"
            onClick={() => setTimeline((prev) => [...prev, emptyTimeline()])}
            className="text-xs px-2 py-1 rounded bg-emerald-600/80 hover:bg-emerald-500"
          >
            + Tambah
          </button>
        }
      >
        <div className="space-y-3">
          {timeline.map((item, index) => (
            <div
              key={index}
              className="rounded-md border border-white/10 p-3 space-y-2 bg-black/10"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/40">Item #{index + 1}</span>
                <button
                  type="button"
                  onClick={() =>
                    setTimeline((prev) => prev.filter((_, i) => i !== index))
                  }
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Hapus
                </button>
              </div>
              <div className="grid gap-2 md:grid-cols-3">
                <TextInput
                  label="Tahun"
                  value={item.year}
                  onChange={(v) => updateTimeline(index, "year", v)}
                />
                <TextInput
                  label="Judul"
                  value={item.title}
                  onChange={(v) => updateTimeline(index, "title", v)}
                />
                <TextInput
                  label="Deskripsi"
                  value={item.description}
                  onChange={(v) => updateTimeline(index, "description", v)}
                />
              </div>
            </div>
          ))}
          {timeline.length === 0 && (
            <div className="text-sm text-white/40">Belum ada timeline.</div>
          )}
        </div>
      </SectionCard>

      <SaveButton saving={saving} onClick={handleSave} />
    </div>
  );
}
