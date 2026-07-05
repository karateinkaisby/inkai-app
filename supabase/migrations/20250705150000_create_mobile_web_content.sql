-- Konten halaman INKAI Mobile Web (home, sejarah, makna lambang, struktur, visi-misi, carousel).
-- Akses edit: admin PP (structural level >= 5) via dashboard inkai-app.

-- ============================================================
-- 1. MOBILE PAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.mobile_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  subtitle text,
  body text,
  extra jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_published boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_mobile_pages_slug ON public.mobile_pages(slug);
CREATE INDEX IF NOT EXISTS idx_mobile_pages_published ON public.mobile_pages(is_published);

ALTER TABLE public.mobile_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published mobile pages"
  ON public.mobile_pages
  FOR SELECT
  USING (is_published = true);

GRANT SELECT ON public.mobile_pages TO anon;
GRANT SELECT ON public.mobile_pages TO authenticated;

-- ============================================================
-- 2. MOBILE CAROUSEL ITEMS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.mobile_carousel_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  description text,
  image_url text NOT NULL,
  link_url text,
  order_index integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_mobile_carousel_order ON public.mobile_carousel_items(order_index);
CREATE INDEX IF NOT EXISTS idx_mobile_carousel_active ON public.mobile_carousel_items(is_active);

ALTER TABLE public.mobile_carousel_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active mobile carousels"
  ON public.mobile_carousel_items
  FOR SELECT
  USING (is_active = true);

GRANT SELECT ON public.mobile_carousel_items TO anon;
GRANT SELECT ON public.mobile_carousel_items TO authenticated;

-- ============================================================
-- 3. SEED DEFAULT CONTENT
-- ============================================================
INSERT INTO public.mobile_pages (slug, title, subtitle, body, extra)
SELECT v.slug, v.title, v.subtitle, v.body, v.extra::jsonb
FROM (VALUES
  (
    'home',
    'INKAI',
    'Digital Ecosystem',
    'Selamat datang di ekosistem digital Ikatan Karate-do Indonesia.',
    '{"hero_title":"INKAI","hero_subtitle":"Digital Ecosystem","welcome_text":"Selamat datang di ekosistem digital Ikatan Karate-do Indonesia."}'
  ),
  (
    'sejarah',
    'Sejarah INKAI',
    'Perjalanan Ikatan Karate-do Indonesia',
    'Ikatan Karate-do Indonesia (INKAI) didirikan sebagai wadah organisasi karate nasional yang bersatu dan profesional.',
    '{"timeline":[{"year":"1984","title":"Pendirian INKAI","description":"INKAI resmi dibentuk sebagai organisasi karate nasional."},{"year":"1990-an","title":"Pengakuan Nasional","description":"INKAI berkembang di seluruh provinsi di Indonesia."},{"year":"2000-an","title":"Era Modernisasi","description":"INKAI terus mengembangkan standar pelatihan dan kompetisi."}]}'
  ),
  (
    'makna-lambang',
    'Makna Lambang INKAI',
    'Filosofi dan simbol organisasi',
    'Lambang INKAI memuat makna filosofis yang menggambarkan semangat karate-do.',
    '{"items":[{"symbol":"Bintang Merah","meaning":"Semangat dan dedikasi terhadap karate-do Indonesia."},{"symbol":"Padi dan Kapas","meaning":"Kesejahteraan dan persatuan bangsa."},{"symbol":"Lingkaran","meaning":"Kesatuan dan keutuhan organisasi."}]}'
  ),
  (
    'struktur-organisasi',
    'Struktur Organisasi',
    'Hirarki kepemimpinan INKAI',
    'Struktur organisasi INKAI terdiri dari Pengurus Pusat, Pengprov, Cabang, dan Ranting.',
    '{"levels":[{"name":"Pengurus Pusat (PP)","members":[{"name":"Ketua Umum","position":"Ketua Umum PP","photo_url":null},{"name":"Sekretaris Jenderal","position":"Sekretaris Jenderal PP","photo_url":null}]},{"name":"Pengurus Provinsi","members":[{"name":"Ketua Pengprov","position":"Ketua Pengprov","photo_url":null}]},{"name":"Cabang & Ranting","members":[{"name":"Ketua Cabang","position":"Ketua Cabang","photo_url":null}]}]}'
  ),
  (
    'visi-misi',
    'Visi & Misi',
    'Arah dan tujuan INKAI',
    '',
    '{"visi":"Menjadi organisasi karate-do terdepan di Indonesia yang unggul, profesional, dan berintegritas.","misi":["Mewujudkan karate-do sebagai olahraga dan seni bela diri yang berkualitas.","Membina atlet dan pelatih berprestasi nasional dan internasional.","Menjalin kerjasama dengan organisasi karate nasional dan internasional.","Mengembangkan sistem keanggotaan digital yang transparan dan efisien."]}'
  )
) AS v(slug, title, subtitle, body, extra)
WHERE NOT EXISTS (
  SELECT 1 FROM public.mobile_pages p WHERE p.slug = v.slug
);

INSERT INTO public.mobile_carousel_items (title, description, image_url, link_url, order_index, is_active)
SELECT v.title, v.description, v.image_url, v.link_url, v.order_index, v.is_active
FROM (VALUES
  ('Selamat Datang di INKAI', 'Ekosistem digital keanggotaan karate Indonesia', '/logo.png', NULL, 1, true),
  ('Daftar Anggota', 'Bergabung dengan komunitas karate-do Indonesia', '/logo.png', '/register', 2, true),
  ('Cari Dojo', 'Temukan dojo terdekat di seluruh Indonesia', '/logo.png', '/dojo', 3, true)
) AS v(title, description, image_url, link_url, order_index, is_active)
WHERE NOT EXISTS (
  SELECT 1 FROM public.mobile_carousel_items c WHERE c.order_index = v.order_index AND c.title = v.title
);

-- ============================================================
-- 4. SIDEBAR MENU (PP admin, structural level >= 5)
-- ============================================================
INSERT INTO public.menus (
  key,
  name,
  scope,
  icon,
  color,
  order_index,
  is_active,
  superadmin_only,
  required_structural_level,
  required_functional_role,
  context_required
)
SELECT
  'mobile-web',
  'Konten Mobile',
  'sidebar',
  'Smartphone',
  'text-sky-400 drop-shadow-[0_0_6px_rgba(56,189,248,0.6)]',
  95,
  true,
  false,
  5,
  NULL,
  false
WHERE NOT EXISTS (
  SELECT 1 FROM public.menus m WHERE m.key = 'mobile-web'
);
