import { NextResponse } from "next/server";

/**
 * ⛔️ WAJIB: Paksa ke Node.js runtime
 * Tanpa ini, Edge Runtime akan silent-fail fetch GitHub RAW
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Sumber resmi data wilayah Indonesia (EMSIFA)
 */
const BASE =
  "https://raw.githubusercontent.com/emsifa/api-wilayah-indonesia/main/api";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");

  if (!path) {
    console.warn("PATH KOSONG");
    return NextResponse.json([]);
  }

  const targetUrl = `${BASE}/${path}`;

  try {
    const res = await fetch(targetUrl, {
      cache: "no-store", // penting saat dev
      headers: {
        "User-Agent": "Next.js",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      console.error("FETCH FAIL:", targetUrl, res.status);
      return NextResponse.json([]);
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (err) {
    console.error("FETCH ERROR:", err);
    return NextResponse.json([]);
  }
}
