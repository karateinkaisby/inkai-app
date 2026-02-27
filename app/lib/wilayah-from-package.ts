/**
 * Data wilayah dari paket idn-area-data (di node_modules, tanpa jaringan).
 * Format dikonversi ke bentuk EMSIFA: id, name, province_id / regency_id / district_id.
 */

import {
  getProvinces,
  getRegencies,
  getDistricts,
  getVillages,
} from "idn-area-data";

function toId(code: string): string {
  return code.replace(/\./g, "");
}

export async function getProvincesFromPackage(): Promise<
  Array<{ id: string; name: string }>
> {
  const list = await getProvinces();
  return list.map((p) => ({ id: toId(p.code), name: p.name }));
}

export async function getRegenciesFromPackage(
  provinceId: string
): Promise<Array<{ id: string; province_id: string; name: string }>> {
  const list = await getRegencies();
  const pid = toId(provinceId);
  return list
    .filter((r) => toId(r.province_code) === pid)
    .map((r) => ({
      id: toId(r.code),
      province_id: toId(r.province_code),
      name: r.name,
    }));
}

export async function getDistrictsFromPackage(
  regencyId: string
): Promise<Array<{ id: string; regency_id: string; name: string }>> {
  const list = await getDistricts();
  return list
    .filter((d) => toId(d.regency_code) === regencyId)
    .map((d) => ({
      id: toId(d.code),
      regency_id: toId(d.regency_code),
      name: d.name,
    }));
}

export async function getVillagesFromPackage(
  districtId: string
): Promise<Array<{ id: string; district_id: string; name: string }>> {
  const list = await getVillages();
  return list
    .filter((v) => toId(v.district_code) === districtId)
    .map((v) => ({
      id: toId(v.code),
      district_id: toId(v.district_code),
      name: v.name,
    }));
}
