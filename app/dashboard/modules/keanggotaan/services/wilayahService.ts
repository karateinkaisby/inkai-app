/**
 * Data wilayah via API internal (statis + idn-area-data), tidak fetch ke emsifa.
 * Cocok untuk WiFi kantor yang memblokir akses luar.
 */

async function fetchWilayah<T = { id: string; name: string }>(
  url: string
): Promise<T[]> {
  try {
    const res = await fetch(url, { cache: "force-cache" });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json) ? json : [];
  } catch {
    return [];
  }
}

export async function getProvinces() {
  return fetchWilayah("/api/wilayah/provinces");
}

export async function getRegencies(provinceId: string) {
  if (!provinceId) return [];
  return fetchWilayah(
    `/api/wilayah/regencies?provinceId=${encodeURIComponent(provinceId)}`
  );
}

export async function getDistricts(regencyId: string) {
  if (!regencyId) return [];
  return fetchWilayah(
    `/api/wilayah/districts?regencyId=${encodeURIComponent(regencyId)}`
  );
}

export async function getVillages(districtId: string) {
  if (!districtId) return [];
  return fetchWilayah(
    `/api/wilayah/villages?districtId=${encodeURIComponent(districtId)}`
  );
}
