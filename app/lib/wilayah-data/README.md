# Data Wilayah (offline / WiFi kantor)

Form alamat memakai data wilayah **tanpa bergantung pada jaringan** dengan urutan:

1. **File statis** `full.json` di folder ini (jika ada)
2. **Paket** `idn-area-data` di node_modules (data ikut ter-install)
3. Fetch ke emsifa.com / GitHub (bisa diblokir WiFi kantor)

Dengan (1) atau (2), dropdown Provinsi / Kabupaten / Kecamatan / Kelurahan tetap jalan di WiFi kantor.

## Mengisi data lengkap ke `full.json` (opsional)

Jika ingin semua data dari satu file (bukan dari paket), jalankan sekali dari jaringan yang **tidak** diblokir (mis. WiFi rumah):

```bash
npm run fetch-wilayah
```

Lalu commit `app/lib/wilayah-data/full.json`. Setelah itu, prioritas dipakai dari file ini.
