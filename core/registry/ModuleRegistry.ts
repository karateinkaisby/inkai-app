// ==============================================
//   IDIK-App Module Registry
//   Mengatur modul mana yang aktif / nonaktif
// ==============================================

export const IDIKModuleRegistry = {
  dashboard: true,
  pasien: true,
  inventaris: true,
  layanan: true,
  tindakan: true,

  // Modul yang ingin disembunyikan / dinonaktifkan:
  siswa: false, // modul siswa dimatikan
  admin: false,
  settings: false,
};

// Optional: tipe untuk autocomplete
export type ModuleRegistryKey = keyof typeof IDIKModuleRegistry;
