-- (OPSIONAL) Fix "permission denied" jika client akses tabel langsung.
-- Dengan API /api/keanggotaan/riwayat (service role), baca data tidak perlu GRANT ini.
-- Jalankan sekali di Supabase SQL Editor jika ingin client bisa akses langsung.

GRANT ALL ON public.kyu TO anon;
GRANT ALL ON public.kyu TO authenticated;

GRANT ALL ON public.dan TO anon;
GRANT ALL ON public.dan TO authenticated;

GRANT ALL ON public.pelatihan TO anon;
GRANT ALL ON public.pelatihan TO authenticated;
