/**
 * Data wilayah: prioritas dari file lokal (tidak pakai jaringan), lalu fallback ke API.
 * - Pertama: baca app/lib/wilayah-data/full.json (tidak diblokir WiFi kantor).
 * - Jika tidak ada: paket idn-area-data (tanpa jaringan).
 * - Terakhir: fetch dari salah satu base URL di bawah (bisa ditambah/ubah urutan).
 * Isi data lokal dengan: npm run fetch-wilayah (jalankan sekali dari jaringan yang tidak diblokir).
 * Import wilayah-static dipanggil lazy agar modul dengan fs tidak ikut ke client.
 */

/** Sumber data wilayah (format EMSIFA: provinces.json, regencies/{id}.json, dll). Bisa tambah mirror atau URL sendiri. */
const WILAYAH_BASE_URLS: string[] = [
  "https://www.emsifa.com/api-wilayah-indonesia/api",
  "https://cdn.jsdelivr.net/gh/emsifa/api-wilayah-indonesia@main/api",
  "https://raw.githubusercontent.com/emsifa/api-wilayah-indonesia/main/api",
];

const FETCH_TIMEOUT_MS = 10_000;

async function fetchWithTimeout(
  url: string,
  opts: RequestInit = {}
): Promise<Response> {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      ...opts,
      signal: ctrl.signal,
      cache: "no-store" as RequestCache,
    });
    return res;
  } finally {
    clearTimeout(id);
  }
}

async function tryFetch(url: string): Promise<Response | null> {
  try {
    const res = await fetchWithTimeout(url);
    if (res.ok) return res;
  } catch {
    // timeout / network error
  }
  return null;
}

/**
 * Ambil data wilayah: (1) file statis, (2) paket idn-area-data (tanpa jaringan), (3) fetch API.
 */
export async function fetchWilayahJson(filePath: string): Promise<unknown> {
  try {
    const { getStaticWilayahJson } = await import("@/app/lib/wilayah-static");
    const staticData = getStaticWilayahJson(filePath);
    // Hanya pakai static jika ada data (array tidak kosong). Kalau [] dari full.json, fallback ke package/network.
    if (staticData != null && (!Array.isArray(staticData) || staticData.length > 0))
      return staticData;
  } catch {
    // wilayah-static pakai fs; skip jika tidak di Node (atau error)
  }

  // Fallback dari paket (data di node_modules, tidak pakai jaringan — cocok untuk WiFi kantor)
  try {
    if (filePath === "provinces.json") {
      const { getProvincesFromPackage } = await import("@/app/lib/wilayah-from-package");
      return getProvincesFromPackage();
    }
    const regMatch = filePath.match(/^regencies\/(.+)\.json$/);
    if (regMatch) {
      const { getRegenciesFromPackage } = await import("@/app/lib/wilayah-from-package");
      return getRegenciesFromPackage(regMatch[1]);
    }
    const distMatch = filePath.match(/^districts\/(.+)\.json$/);
    if (distMatch) {
      const { getDistrictsFromPackage } = await import("@/app/lib/wilayah-from-package");
      return getDistrictsFromPackage(distMatch[1]);
    }
    const villMatch = filePath.match(/^villages\/(.+)\.json$/);
    if (villMatch) {
      const { getVillagesFromPackage } = await import("@/app/lib/wilayah-from-package");
      return getVillagesFromPackage(villMatch[1]);
    }
  } catch (e) {
    console.warn("Wilayah from package failed, trying network:", e);
  }

  for (const base of WILAYAH_BASE_URLS) {
    const url = `${base}/${filePath}`;
    const res = await tryFetch(url);
    if (res) return res.json();
  }

  console.warn("Wilayah fetch failed (all sources):", filePath);
  return [];
}
