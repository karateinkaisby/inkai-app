# inkai-mobile-web

Portal mobile INKAI yang menampilkan konten publik dari CMS inkai-app.

## Setup

```bash
cd mobile-web
cp .env.example .env.local
npm install
npm run dev
```

Buka http://localhost:3001

## Environment

| Variable | Deskripsi |
|---|---|
| `NEXT_PUBLIC_INKAI_CMS_URL` | URL inkai-app (dashboard) untuk fetch `/api/mobile-web/content` |

Contoh production:

```env
NEXT_PUBLIC_INKAI_CMS_URL=https://<domain-inkai-app-anda>
```

## Halaman

| Route | Konten CMS slug |
|---|---|
| `/halaman/home` | `home` + carousel |
| `/halaman/sejarah` | `sejarah` |
| `/halaman/makna-lambang` | `makna-lambang` |
| `/halaman/struktur-organisasi` | `struktur-organisasi` |
| `/halaman/visi-misi` | `visi-misi` |

Konten diedit di dashboard inkai-app: **Konten Mobile** (`/dashboard/mobile-web`).

## Deploy Vercel

1. Buat project Vercel dengan **Root Directory** = `mobile-web`
2. Set env `NEXT_PUBLIC_INKAI_CMS_URL` ke domain inkai-app production
3. Deploy

Pastikan migration CMS sudah di-push ke Supabase (`npm run supabase:push` di root inkai-app).
