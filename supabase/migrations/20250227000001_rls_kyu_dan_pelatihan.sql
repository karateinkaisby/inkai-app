-- RLS untuk tabel kyu, dan, pelatihan
-- Pastikan dijalankan di Supabase (pg14/15).

-- Aktifkan RLS (jika belum)
ALTER TABLE public.kyu ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pelatihan ENABLE ROW LEVEL SECURITY;

-- Hanya pemilik profil yang boleh membaca KYU miliknya
CREATE POLICY "kyu_read_own"
  ON public.kyu
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = kyu.profile_id
        AND p.user_id = auth.uid()
    )
  );

-- Hanya pemilik profil yang boleh membaca DAN miliknya
CREATE POLICY "dan_read_own"
  ON public.dan
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = dan.profile_id
        AND p.user_id = auth.uid()
    )
  );

-- Hanya pemilik profil yang boleh membaca pelatihan miliknya
CREATE POLICY "pelatihan_read_own"
  ON public.pelatihan
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = pelatihan.profile_id
        AND p.user_id = auth.uid()
    )
  );

