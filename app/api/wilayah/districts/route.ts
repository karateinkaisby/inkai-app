import { fetchWilayahJson } from "../fetchWilayah";

export async function GET(req: Request) {
  const regencyId = new URL(req.url).searchParams.get("regencyId");
  if (!regencyId)
    return Response.json({ error: "regencyId required" }, { status: 400 });

  try {
    const data = await fetchWilayahJson(`districts/${regencyId}.json`);
    const arr = Array.isArray(data) ? data : [];
    return Response.json(arr);
  } catch (err) {
    console.error("Wilayah districts failed:", err);
    return Response.json([]);
  }
}
