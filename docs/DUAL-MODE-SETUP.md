# inkai-app — Dual Mode: Lokal vs Online

Panduan singkat untuk menjalankan inkai-app dengan database **lokal** (Supabase local) atau **online** (Supabase Cloud), dan sinkronisasi migrasi ke kedua environment.

---

## Ringkasan

| Mode   | Database              | Env file        | Kapan dipakai        |
|--------|------------------------|-----------------|----------------------|
| Lokal  | Supabase local (Docker)| `.env.local`    | Development          |
| Online | Supabase Cloud         | `.env.production` | Production / staging |

Satu waktu hanya satu mode aktif; pilih via file env yang dipakai Next.js.

---

## 1. Mode Lokal (Development)

### Prasyarat

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) terpasang
- [Supabase CLI](https://supabase.com/docs/guides/cli) terpasang:
  ```bash
  npm install -g supabase
  ```

### Langkah

1. **Jalankan Supabase lokal**
   ```bash
   npm run supabase:start
   ```
   Atau langsung: `supabase start`
   Output akan menampilkan:
   - `API URL`: `http://127.0.0.1:54321`
   - `anon key`
   - `service_role key`

2. **Buat `.env.local`** (copy dari `.env.example`):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key dari output>
   SUPABASE_SERVICE_ROLE_KEY=<service_role key dari output>
   ```

3. **Jalankan migrasi ke DB lokal**
   ```bash
   npm run supabase:reset
   ```
   Atau langsung: `supabase db reset` / `supabase migration up`

4. **Jalankan Next.js**
   ```bash
   npm run dev
   ```

5. **Stop Supabase lokal** (jika selesai):
   ```bash
   npm run supabase:stop
   ```

---

## 2. Mode Online (Production / Staging)

### Langkah

1. **Ambil credential** dari [Supabase Dashboard](https://supabase.com/dashboard):
   - Project Settings → API → `URL`, `anon public`, `service_role` (secret)

2. **Buat `.env.production`** (atau set di Vercel/hosting):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
   SUPABASE_SERVICE_ROLE_KEY=<service_role key>
   ```

3. **Link project** (sekali saja):
   ```bash
   supabase link --project-ref <PROJECT_REF>
   ```
   `PROJECT_REF` ada di URL dashboard: `https://supabase.com/dashboard/project/<PROJECT_REF>`.

4. **Push migrasi ke remote**
   ```bash
   npm run supabase:push
   ```

5. **Deploy** Next.js dengan env production (Vercel/hosting akan pakai `.env.production` atau env vars yang di-set di dashboard).

---

## 3. Sinkronisasi Migrasi

| Tujuan   | Perintah |
|----------|----------|
| Lokal    | `npm run supabase:reset` |
| Remote   | `npm run supabase:push`  |

Pastikan migrasi di `supabase/migrations/` di-commit ke Git; lalu jalankan perintah di atas sesuai environment yang dipakai.

---

## 4. Opsional: Root Superadmin

Untuk akun root superadmin via env (bukan hard-coded), tambahkan di `.env.local` atau `.env.production`:

```env
INKAI_ROOT_EMAIL=karateinkaisby@gmail.com
NEXT_PUBLIC_INKAI_ROOT_EMAIL=karateinkaisby@gmail.com
```

Jika tidak di-set, hanya `app_role = 'SUPERADMIN'` di tabel `profiles` yang dianggap superadmin.
