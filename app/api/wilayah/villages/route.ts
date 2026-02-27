import { fetchWilayahJson } from "../fetchWilayah";

export async function GET(req: Request) {
  const districtId = new URL(req.url).searchParams.get("districtId");
  if (!districtId)
    return Response.json({ error: "districtId required" }, { status: 400 });

  try {
    const data = await fetchWilayahJson(`villages/${districtId}.json`);
    const arr = Array.isArray(data) ? data : [];
    return Response.json(arr);
  } catch (err) {
    console.error("Wilayah villages failed:", err);
    return Response.json([]);
  }
}
