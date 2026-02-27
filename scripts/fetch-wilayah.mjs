/**
 * Unduh data wilayah Indonesia (format EMSIFA) ke app/lib/wilayah-data/full.json.
 * Jalankan sekali dari jaringan yang tidak diblokir (mis. WiFi rumah):
 *   node scripts/fetch-wilayah.mjs
 * Setelah itu, form alamat akan jalan tanpa jaringan (cocok untuk WiFi kantor).
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Gunakan emsifa.com (jalankan script dari WiFi yang tidak diblokir, mis. rumah)
const BASE = "https://www.emsifa.com/api-wilayah-indonesia/api";
const OUT_DIR = path.join(__dirname, "..", "app", "lib", "wilayah-data");
const OUT_FILE = path.join(OUT_DIR, "full.json");

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  return res.json();
}

async function main() {
  console.log("Fetching provinces...");
  const provinces = await fetchJson(`${BASE}/provinces.json`);
  const regencies = [];
  const districts = [];
  const villages = [];

  for (const p of provinces) {
    const pid = p.id;
    console.log(`  Regencies for province ${pid}...`);
    const regs = await fetchJson(`${BASE}/regencies/${pid}.json`);
    regencies.push(...regs);
    for (const r of regs) {
      const rid = r.id;
      const dists = await fetchJson(`${BASE}/districts/${rid}.json`);
      districts.push(...dists);
      for (const d of dists) {
        const did = d.id;
        const vills = await fetchJson(`${BASE}/villages/${did}.json`);
        villages.push(...vills);
      }
    }
  }

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  const full = { provinces, regencies, districts, villages };
  fs.writeFileSync(OUT_FILE, JSON.stringify(full), "utf-8");
  console.log(
    `Done. Written to ${OUT_FILE} (provinces: ${provinces.length}, regencies: ${regencies.length}, districts: ${districts.length}, villages: ${villages.length})`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
