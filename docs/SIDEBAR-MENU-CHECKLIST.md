# Sidebar vs MenuList (DB) — Checklist

Sidebar menampilkan menu dari **sumber yang sama dengan MenuList**: tabel `menus` di Supabase, lewat RPC **`get_sidebar_menus`**.

## Syarat menu muncul di Sidebar

Agar suatu baris di tabel `menus` tampil di Sidebar, **semua** kondisi berikut harus terpenuhi:

| # | Kondisi | Di mana | Contoh (menu Audit) |
|---|---------|---------|----------------------|
| 1 | **`is_active = true`** | DB + filter di client | Anda sudah jalankan: `UPDATE menus SET is_active = true WHERE key = 'audit';` |
| 2 | **`scope = 'sidebar'`** | DB + filter di client | Audit punya `scope: "sidebar"` ✅ |
| 3 | **RPC `get_sidebar_menus` mengembalikan baris tersebut** | Supabase (definisi fungsi) | Cek di SQL Editor: `SELECT * FROM get_sidebar_menus();` — baris audit harus ada. |
| 4 | **`canAccessMenu(...)` = true** | Client (`canAccess.ts`) | Menu Audit punya `superadmin_only: true` → hanya user dengan `app_role = 'SUPERADMIN'` atau email `karateinkaisby@gmail.com` yang bisa lihat. |

## Cek cepat

1. **DB**  
   - `SELECT id, key, is_active, scope, superadmin_only FROM menus WHERE key = 'audit';`  
   - Pastikan: `is_active = true`, `scope = 'sidebar'`.

2. **RPC**  
   - Di Supabase → SQL Editor:  
     `SELECT * FROM get_sidebar_menus();`  
   - Pastikan baris dengan `key = 'audit'` ada di hasil.  
   - Jika tidak ada, definisi fungsi `get_sidebar_menus` mungkin memfilter (mis. hanya `is_active = true`). Setelah `UPDATE` tadi, biasanya RPC yang benar akan mengembalikan audit. Jika RPC Anda memfilter `scope = 'sidebar'` saja tanpa `is_active`, client tetap memfilter `is_active`, jadi audit akan muncul setelah UPDATE.

3. **User login**  
   - Menu Audit hanya untuk **superadmin**.  
   - Pastikan user yang dipakai login punya di `profiles`: `app_role = 'SUPERADMIN'` atau email = `karateinkaisby@gmail.com`.

## Contoh definisi RPC (Supabase)

Agar Sidebar konsisten dengan MenuList, RPC sebaiknya mengembalikan semua baris yang relevan; filter `is_active` dan `scope` bisa di client. Contoh aman:

```sql
CREATE OR REPLACE FUNCTION get_sidebar_menus()
RETURNS SETOF menus
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT * FROM menus
  WHERE scope = 'sidebar'
  ORDER BY order_index;
$$;
```

Atau jika Anda ingin filter `is_active` di DB:

```sql
  SELECT * FROM menus
  WHERE scope = 'sidebar' AND is_active = true
  ORDER BY order_index;
```

Setelah `UPDATE menus SET is_active = true WHERE key = 'audit';`, dengan definisi di atas baris audit akan ikut dikembalikan dan (jika user superadmin) tampil di Sidebar.

## Ringkasan

- **MenuList (Settings)** memakai RPC `get_all_menus` (semua menu).
- **Sidebar** memakai RPC `get_sidebar_menus` + filter client: `is_active`, `scope === 'sidebar'`, dan `canAccessMenu` (termasuk `superadmin_only`).
- Jika Audit tidak muncul setelah UPDATE: cek hasil `get_sidebar_menus()` dan role/email user yang login.
