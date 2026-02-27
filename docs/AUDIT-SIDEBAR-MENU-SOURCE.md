# Audit: Sumber Menu Sidebar (menuConfig vs MenuList/DB)

**Tanggal:** 24 Februari 2026

## Kondisi sebelumnya (sebelum perbaikan)

| Aspek | Sumber | Keterangan |
|-------|--------|------------|
| **Daftar menu** | **DB (RPC `get_sidebar_menus`)** | Sidebar memuat menu dari tabel `menus` via RPC, bukan dari `app/config/menuConfig.ts`. |
| **Tampilan** | Tabel `menus` | `id`, `key`, `name`, `icon` (string), `color`, `order_index`, `scope`, `is_active`, `superadmin_only`, `required_structural_level`, dll. |
| **Realtime** | Subscription `menus` | Perubahan di tabel `menus` me-refresh daftar sidebar. |
| **Permission** | `canAccess.ts` + data dari DB | Setiap baris menu dari DB dicek dengan `canAccessMenu(access, sessionUser)`. |

**Akibat:** Urutan, label, dan daftar menu sepenuhnya mengikuti isi tabel `menus` (MenuList). Perubahan hanya bisa lewat DB/Settings, tidak mengikuti definisi statis di `menuConfig`.

---

## Kondisi yang diinginkan

| Aspek | Sumber | Keterangan |
|-------|--------|------------|
| **Daftar menu** | **menuConfig** | Sidebar memakai `app/config/menuConfig.ts` sebagai sumber tunggal daftar menu. |
| **Tampilan** | MenuItem[] | `key`, `name`, `icon` (LucideIcon), `color`, `scope`, `superadminOnly`, `requiresRead`. |
| **Permission** | Tetap `canAccess.ts` | Session user (app_role, structural_roles, dll.) tetap dari API; item yang ditampilkan difilter berdasarkan menuConfig (mis. `superadminOnly`) dan session. |
| **Realtime** | Opsional | Jika tidak pakai tabel `menus` untuk daftar, subscription `menus` bisa dihapus atau dipakai hanya untuk fitur lain (mis. Settings). |

---

## Perubahan yang dilakukan

1. **Sidebar.tsx**
   - Import `menuConfig` dari `@/app/config/menuConfig`.
   - Hapus pemanggilan `get_sidebar_menus` dan state `menus` dari DB untuk daftar sidebar.
   - Hapus atau nonaktifkan subscription realtime ke tabel `menus` untuk keperluan daftar sidebar.
   - `visibleMenus` dihitung dari `menuConfig` yang difilter dengan `canAccessMenu` (map MenuItem → MenuAccess: `key`, `superadmin_only` dari `superadminOnly`).
   - Session user tetap di-load dari `profiles` + `get_user_structural_roles` untuk permission.

2. **Permission**
   - MenuItem punya `superadminOnly`; bisa di-map ke `MenuAccess.superadmin_only`.
   - Field seperti `required_structural_level` tidak ada di menuConfig; bila nanti dibutuhkan, bisa ditambah di menuConfig atau diambil dari API per key.

3. **MenuList (Settings)**
   - Tetap dipakai di halaman Settings untuk mengelola tabel `menus` (CRUD). Sidebar tidak lagi bergantung pada isi tabel ini untuk menampilkan menu.
