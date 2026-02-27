# Laporan Error 42P01 – Supabase Storage (Internal Database)

**Tanggal:** 24 Februari 2026  
**Tujuan:** Untuk disampaikan ke Supabase Support saat melaporkan masalah Storage.

---

## 1. Ringkasan Masalah

Saat aplikasi mengunggah file ke bucket Storage (`avatars_v2`) melalui **Supabase JavaScript Client** (`@supabase/supabase-js`), operasi upload mengembalikan error:

- **Kode error:** `42P01`
- **Tipe error:** `StorageApiError: database error, code: 42P01`
- **Konteks:** Error terjadi **hanya pada operasi Storage (upload)**. Operasi lain (tabel `profiles`, RPC `save_profile`, query `storage.buckets`, `storage.objects`) berjalan normal.

Ini mengindikasikan bahwa error **berasal dari internal database yang dipakai oleh fitur Storage Supabase**, bukan dari kode aplikasi atau tabel yang kami kelola sendiri.

---

## 2. Detail Error

| Item | Keterangan |
|------|------------|
| **Error class** | `StorageApiError` |
| **Pesan** | `database error, code: 42P01` |
| **Kode PostgreSQL** | `42P01` = **undefined_table** (relasi/tabel tidak ditemukan) |
| **Lokasi trigger** | Panggilan `supabase.storage.from("avatars_v2").upload(filePath, file, options)` dari aplikasi (browser, user terautentikasi) |
| **Project** | Supabase Project (URL dan anon key dipakai sesuai dashboard) |

Error muncul **konsisten** setiap kali upload file dari aplikasi. Upload manual lewat Supabase Dashboard (Storage → bucket → Upload file) perlu dicek terpisah apakah juga memicu 42P01 atau tidak.

---

## 3. Yang Sudah Kami Verifikasi

- **Tabel `public.profiles`**  
  - Ada dan dapat di-query normal.  
  - RPC `save_profile` (insert/update ke `public.profiles`) berjalan sukses.

- **Bucket Storage**  
  - Query `SELECT * FROM storage.buckets WHERE name = 'avatars_v2'` mengembalikan 1 baris (bucket ada, public, tipe STANDARD).

- **Tabel Storage**  
  - Query `SELECT * FROM storage.objects LIMIT 1` berhasil dan mengembalikan data (termasuk objek di bucket `avatars_v2`).  
  - Artinya schema/tabel internal Storage **dapat diakses** dari SQL Editor, tetapi operasi **upload via Storage API** tetap mengembalikan 42P01.

- **Autentikasi**  
  - User login (authenticated), session valid.  
  - Error terjadi setelah panggilan upload, bukan pada auth.

Dari situ kami menyimpulkan: **42P01 kemungkinan dipicu oleh tabel/relasi internal yang diakses saat Storage API memproses upload**, bukan oleh tabel aplikasi (`profiles`) atau oleh bucket/object yang kami query di atas.

---

## 4. Kode yang Memicu Error (referensi)

```javascript
const { error: uploadError } = await supabase.storage
  .from("avatars_v2")
  .upload(filePath, file, {
    upsert: true,
    contentType: file.type,
    cacheControl: "3600",
  });

if (uploadError) {
  // uploadError = StorageApiError: database error, code: 42P01
}
```

- **Client:** `@supabase/supabase-js` (versi mengikuti package.json project).
- **Environment:** Browser, Next.js app, menggunakan `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

---

## 5. Yang Kami Butuhkan dari Supabase Support

1. **Konfirmasi penyebab 42P01**  
   Apakah ada tabel/relasi internal Storage yang hilang, salah schema, atau tidak ter-create saat setup project (misalnya migration Storage tidak lengkap)?

2. **Langkah perbaikan yang disarankan**  
   - Apakah perlu menjalankan migration/script tertentu untuk memperbaiki schema Storage?  
   - Atau apakah disarankan membuat project baru dan migrasi data?

3. **Kondisi project**  
   Apakah ada batasan atau kondisi khusus (region, plan, legacy project) yang membuat Storage API mengakses objek yang tidak ada (42P01)?

---

## 6. Informasi Tambahan (opsional, isi jika ada)

- **Supabase project region:** …  
- **Plan (Free/Pro/etc.):** …  
- **Apakah project ini hasil migrasi/restore atau project baru:** …  
- **Pesan error lengkap dari Supabase Dashboard (Logs → Storage / Database):** …

---

**Kontak / referensi:**  
Laporan ini dibuat untuk keperluan tiket support Supabase terkait error 42P01 pada operasi Storage API (upload ke bucket `avatars_v2`).
