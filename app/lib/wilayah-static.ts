/**
 * Sumber data wilayah dari file lokal (tidak pakai jaringan).
 * Hanya untuk server (Node fs). Jangan di-import dari client.
 */

import fs from "fs";
import path from "path";

type WilayahFull = {
  provinces: Array<{ id: string; name: string }>;
  regencies: Array<{ id: string; province_id: string; name: string }>;
  districts: Array<{ id: string; regency_id: string; name: string }>;
  villages: Array<{ id: string; district_id: string; name: string }>;
};

let cached: WilayahFull | null = null;

function getDataDir(): string {
  return path.join(process.cwd(), "app", "lib", "wilayah-data");
}

function loadFullJson(): WilayahFull | null {
  if (typeof window !== "undefined") return null;
  if (cached) return cached;
  const fullPath = path.join(getDataDir(), "full.json");
  try {
    if (!fs.existsSync(fullPath)) return null;
    const raw = fs.readFileSync(fullPath, "utf-8");
    const data = JSON.parse(raw) as WilayahFull;
    if (
      Array.isArray(data.provinces) &&
      Array.isArray(data.regencies) &&
      Array.isArray(data.districts) &&
      Array.isArray(data.villages)
    ) {
      cached = data;
      return cached;
    }
  } catch {
    // ignore
  }
  return null;
}

/**
 * Resolve data wilayah dari full.json (tanpa jaringan).
 * path contoh: "provinces.json", "regencies/35.json", "districts/3578.json", "villages/3578211.json"
 */
export function getStaticWilayahJson(filePath: string): unknown | null {
  const data = loadFullJson();
  if (!data) return null;

  if (filePath === "provinces.json") {
    return data.provinces;
  }
  const regMatch = filePath.match(/^regencies\/(.+)\.json$/);
  if (regMatch) {
    const provinceId = regMatch[1];
    return data.regencies.filter((r) => r.province_id === provinceId);
  }
  const distMatch = filePath.match(/^districts\/(.+)\.json$/);
  if (distMatch) {
    const regencyId = distMatch[1];
    return data.districts.filter((d) => d.regency_id === regencyId);
  }
  const villMatch = filePath.match(/^villages\/(.+)\.json$/);
  if (villMatch) {
    const districtId = villMatch[1];
    return data.villages.filter((v) => v.district_id === districtId);
  }
  return null;
}

export function hasStaticWilayahData(): boolean {
  return loadFullJson() !== null;
}
