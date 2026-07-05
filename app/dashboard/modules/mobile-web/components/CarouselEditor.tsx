"use client";

import { useState } from "react";
import type { MobileCarouselRow } from "@/app/lib/mobile-web/types";
import { SaveButton, SectionCard, TextArea, TextInput } from "./FormFields";

type Props = {
  carousels: MobileCarouselRow[];
  onCreate: (payload: Partial<MobileCarouselRow>) => Promise<void>;
  onUpdate: (id: string, payload: Partial<MobileCarouselRow>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

const emptyForm = (): Partial<MobileCarouselRow> => ({
  title: "",
  description: "",
  image_url: "",
  link_url: "",
  order_index: 0,
  is_active: true,
});

export default function CarouselEditor({
  carousels,
  onCreate,
  onUpdate,
  onDelete,
}: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<MobileCarouselRow>>(emptyForm());
  const [saving, setSaving] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);

  function startCreate() {
    setEditingId(null);
    setForm({
      ...emptyForm(),
      order_index: carousels.length + 1,
    });
  }

  function startEdit(item: MobileCarouselRow) {
    setEditingId(item.id);
    setForm({ ...item });
  }

  async function handleSave() {
    if (!form.image_url?.trim()) {
      alert("URL gambar wajib diisi");
      return;
    }

    try {
      setSaving(true);
      if (editingId) {
        await onUpdate(editingId, form);
      } else {
        await onCreate(form);
      }
      setEditingId(null);
      setForm(emptyForm());
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Gagal menyimpan");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus slide carousel ini?")) return;
    try {
      setProcessingId(id);
      await onDelete(id);
      if (editingId === id) {
        setEditingId(null);
        setForm(emptyForm());
      }
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Gagal menghapus");
    } finally {
      setProcessingId(null);
    }
  }

  return (
    <div className="space-y-4">
      <SectionCard
        title="Daftar Carousel"
        action={
          <button
            type="button"
            onClick={startCreate}
            className="text-xs px-2 py-1 rounded bg-emerald-600/80 hover:bg-emerald-500"
          >
            + Tambah Slide
          </button>
        }
      >
        <div className="space-y-2">
          {carousels.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-md border border-white/10 px-3 py-2 bg-black/10"
            >
              <div className="min-w-0">
                <div className="text-sm font-medium truncate">
                  {item.title || "(Tanpa judul)"}
                </div>
                <div className="text-xs text-white/40 truncate">
                  #{item.order_index} · {item.image_url}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => startEdit(item)}
                  className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  disabled={processingId === item.id}
                  className="text-xs px-2 py-1 rounded bg-red-600/20 text-red-300 hover:bg-red-600/30 disabled:opacity-50"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
          {carousels.length === 0 && (
            <div className="text-sm text-white/40">Belum ada slide carousel.</div>
          )}
        </div>
      </SectionCard>

      <SectionCard title={editingId ? "Edit Slide" : "Tambah Slide Baru"}>
        <div className="grid gap-3 md:grid-cols-2">
          <TextInput
            label="Judul"
            value={form.title ?? ""}
            onChange={(v) => setForm((prev) => ({ ...prev, title: v }))}
          />
          <TextInput
            label="Urutan"
            value={String(form.order_index ?? 0)}
            onChange={(v) =>
              setForm((prev) => ({ ...prev, order_index: Number(v) || 0 }))
            }
          />
        </div>
        <TextArea
          label="Deskripsi"
          value={form.description ?? ""}
          onChange={(v) => setForm((prev) => ({ ...prev, description: v }))}
          rows={2}
        />
        <TextInput
          label="URL Gambar"
          value={form.image_url ?? ""}
          onChange={(v) => setForm((prev) => ({ ...prev, image_url: v }))}
          placeholder="https://... atau /logo.png"
        />
        <TextInput
          label="Link URL (opsional)"
          value={form.link_url ?? ""}
          onChange={(v) => setForm((prev) => ({ ...prev, link_url: v || null }))}
          placeholder="/register"
        />
        <label className="flex items-center gap-2 text-sm text-white/80">
          <input
            type="checkbox"
            checked={form.is_active ?? true}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, is_active: e.target.checked }))
            }
          />
          Aktif
        </label>
        <SaveButton saving={saving} onClick={handleSave} />
      </SectionCard>
    </div>
  );
}
