import { fetchWilayahJson } from "../fetchWilayah";

export async function GET() {
  try {
    const data = await fetchWilayahJson("provinces.json");
    const arr = Array.isArray(data) ? data : [];
    return Response.json(arr);
  } catch (err) {
    console.error("Wilayah provinces failed:", err);
    return Response.json([]);
  }
}
