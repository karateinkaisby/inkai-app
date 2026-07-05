"use client";

import { useEffect, useState } from "react";
import type { MobilePageRow, OrgLevel, OrgMember } from "@/app/lib/mobile-web/types";
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

const emptyMember = (): OrgMember => ({
  name: "",
  position: "",
  photo_url: null,
});

const emptyLevel = (): OrgLevel => ({
  name: "",
  members: [emptyMember()],
});

export default function StrukturEditor({ page, onSave }: Props) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");
  const [levels, setLevels] = useState<OrgLevel[]>([]);
  const [isPublished, setIsPublished] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!page) return;
    setTitle(page.title ?? "");
    setSubtitle(page.subtitle ?? "");
    setBody(page.body ?? "");
    setLevels(
      Array.isArray(page.extra?.levels) ? (page.extra.levels as OrgLevel[]) : [],
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
        extra: { levels },
      });
    } finally {
      setSaving(false);
    }
  }

  if (!page) {
    return (
      <div className="text-sm text-white/50">Memuat data struktur organisasi...</div>
    );
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
        title="Level Organisasi"
        action={
          <button
            type="button"
            onClick={() => setLevels((prev) => [...prev, emptyLevel()])}
            className="text-xs px-2 py-1 rounded bg-emerald-600/80 hover:bg-emerald-500"
          >
            + Level
          </button>
        }
      >
        <div className="space-y-4">
          {levels.map((level, levelIndex) => (
            <div
              key={levelIndex}
              className="rounded-md border border-white/10 p-3 space-y-3 bg-black/10"
            >
              <div className="flex items-center justify-between gap-2">
                <TextInput
                  label="Nama Level"
                  value={level.name}
                  onChange={(v) =>
                    setLevels((prev) =>
                      prev.map((row, i) =>
                        i === levelIndex ? { ...row, name: v } : row,
                      ),
                    )
                  }
                />
                <button
                  type="button"
                  onClick={() =>
                    setLevels((prev) => prev.filter((_, i) => i !== levelIndex))
                  }
                  className="mt-5 text-xs text-red-400 hover:text-red-300 shrink-0"
                >
                  Hapus Level
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/50">Anggota</span>
                  <button
                    type="button"
                    onClick={() =>
                      setLevels((prev) =>
                        prev.map((row, i) =>
                          i === levelIndex
                            ? { ...row, members: [...row.members, emptyMember()] }
                            : row,
                        ),
                      )
                    }
                    className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20"
                  >
                    + Anggota
                  </button>
                </div>

                {level.members.map((member, memberIndex) => (
                  <div
                    key={memberIndex}
                    className="grid gap-2 md:grid-cols-3 border border-white/5 rounded p-2"
                  >
                    <TextInput
                      label="Nama"
                      value={member.name}
                      onChange={(v) =>
                        setLevels((prev) =>
                          prev.map((row, i) =>
                            i === levelIndex
                              ? {
                                  ...row,
                                  members: row.members.map((m, j) =>
                                    j === memberIndex ? { ...m, name: v } : m,
                                  ),
                                }
                              : row,
                          ),
                        )
                      }
                    />
                    <TextInput
                      label="Jabatan"
                      value={member.position}
                      onChange={(v) =>
                        setLevels((prev) =>
                          prev.map((row, i) =>
                            i === levelIndex
                              ? {
                                  ...row,
                                  members: row.members.map((m, j) =>
                                    j === memberIndex ? { ...m, position: v } : m,
                                  ),
                                }
                              : row,
                          ),
                        )
                      }
                    />
                    <TextInput
                      label="URL Foto"
                      value={member.photo_url ?? ""}
                      onChange={(v) =>
                        setLevels((prev) =>
                          prev.map((row, i) =>
                            i === levelIndex
                              ? {
                                  ...row,
                                  members: row.members.map((m, j) =>
                                    j === memberIndex ? { ...m, photo_url: v || null } : m,
                                  ),
                                }
                              : row,
                          ),
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SaveButton saving={saving} onClick={handleSave} />
    </div>
  );
}
