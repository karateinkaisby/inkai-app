"use client";

import { useEffect, useState } from "react";
import type { HomeExtra, MobilePageRow } from "@/app/lib/mobile-web/types";
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

export default function HomeEditor({ page, onSave }: Props) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [welcomeText, setWelcomeText] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!page) return;
    const extra = (page.extra ?? {}) as HomeExtra;
    setTitle(page.title ?? "");
    setSubtitle(page.subtitle ?? "");
    setBody(page.body ?? "");
    setHeroTitle(extra.hero_title ?? "");
    setHeroSubtitle(extra.hero_subtitle ?? "");
    setWelcomeText(extra.welcome_text ?? "");
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
        extra: {
          hero_title: heroTitle,
          hero_subtitle: heroSubtitle,
          welcome_text: welcomeText,
        },
      });
    } finally {
      setSaving(false);
    }
  }

  if (!page) {
    return <div className="text-sm text-white/50">Memuat data home...</div>;
  }

  return (
    <div className="space-y-4">
      <SectionCard title="Hero Section">
        <div className="grid gap-3 md:grid-cols-2">
          <TextInput label="Judul Hero" value={heroTitle} onChange={setHeroTitle} />
          <TextInput
            label="Subjudul Hero"
            value={heroSubtitle}
            onChange={setHeroSubtitle}
          />
        </div>
        <TextArea
          label="Teks Sambutan"
          value={welcomeText}
          onChange={setWelcomeText}
          rows={3}
        />
      </SectionCard>

      <SectionCard title="Metadata Halaman">
        <div className="grid gap-3 md:grid-cols-2">
          <TextInput label="Title (SEO)" value={title} onChange={setTitle} />
          <TextInput label="Subtitle" value={subtitle} onChange={setSubtitle} />
        </div>
        <TextArea label="Konten Utama" value={body} onChange={setBody} rows={5} />
        <CheckboxField
          label="Publikasikan halaman"
          checked={isPublished}
          onChange={setIsPublished}
        />
      </SectionCard>

      <SaveButton saving={saving} onClick={handleSave} />
    </div>
  );
}
