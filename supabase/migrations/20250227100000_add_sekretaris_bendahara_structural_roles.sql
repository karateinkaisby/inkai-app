-- Menambah role struktural SEKRETARIS dan BENDAHARA di tiap level organisasi.
-- Sekretaris/Bendahara Ranting (L2), Cabang (L3), Pengprov (L4), PP (L5).
-- Jalankan di Supabase: SQL Editor atau supabase db push.

-- Pastikan structural_role_master ada (jika belum, buat dulu)
CREATE TABLE IF NOT EXISTS public.structural_role_master (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_name text NOT NULL UNIQUE,
  structural_level integer NOT NULL CHECK (structural_level >= 1 AND structural_level <= 5),
  organization_type text DEFAULT 'KARATE',
  created_at timestamptz DEFAULT now()
);

-- Insert role baru (skip jika sudah ada)
INSERT INTO public.structural_role_master (role_name, structural_level, organization_type)
SELECT v.role_name, v.structural_level, v.organization_type
FROM (VALUES
  ('SEKRETARIS_RANTING', 2, 'KARATE'),
  ('BENDAHARA_RANTING', 2, 'KARATE'),
  ('SEKRETARIS_CABANG', 3, 'KARATE'),
  ('BENDAHARA_CABANG', 3, 'KARATE'),
  ('SEKRETARIS_PENGPROV', 4, 'KARATE'),
  ('BENDAHARA_PENGPROV', 4, 'KARATE'),
  ('SEKRETARIS_PP', 5, 'KARATE'),
  ('BENDAHARA_PP', 5, 'KARATE')
) AS v(role_name, structural_level, organization_type)
WHERE NOT EXISTS (
  SELECT 1 FROM public.structural_role_master m WHERE m.role_name = v.role_name
);
