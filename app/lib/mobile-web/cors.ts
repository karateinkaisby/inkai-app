import { NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  "https://inkai-mobile-web.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001",
];

export function withMobileWebCors(response: NextResponse, origin: string | null) {
  const allowed =
    origin && ALLOWED_ORIGINS.some((item) => item === origin) ? origin : "*";

  response.headers.set("Access-Control-Allow-Origin", allowed);
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return response;
}

export function mobileWebOptionsResponse(origin: string | null) {
  return withMobileWebCors(new NextResponse(null, { status: 204 }), origin);
}
