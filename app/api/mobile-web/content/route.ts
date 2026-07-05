export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/app/lib/supabase/admin";
import {
  mobileWebOptionsResponse,
  withMobileWebCors,
} from "@/app/lib/mobile-web/cors";

export async function OPTIONS(req: NextRequest) {
  return mobileWebOptionsResponse(req.headers.get("origin"));
}

export async function GET(req: NextRequest) {
  const origin = req.headers.get("origin");
  const supabase = createSupabaseAdminClient();

  const { data: pages, error: pagesError } = await supabase
    .from("mobile_pages")
    .select("*")
    .eq("is_published", true)
    .order("slug");

  if (pagesError) {
    console.error("[mobile-web/content][GET pages]", pagesError);
    return withMobileWebCors(
      NextResponse.json({ ok: false, error: pagesError.message }, { status: 500 }),
      origin,
    );
  }

  const { data: carousels, error: carouselError } = await supabase
    .from("mobile_carousel_items")
    .select("*")
    .eq("is_active", true)
    .order("order_index");

  if (carouselError) {
    console.error("[mobile-web/content][GET carousels]", carouselError);
    return withMobileWebCors(
      NextResponse.json({ ok: false, error: carouselError.message }, { status: 500 }),
      origin,
    );
  }

  return withMobileWebCors(
    NextResponse.json({
      ok: true,
      pages: pages ?? [],
      carousels: carousels ?? [],
    }),
    origin,
  );
}
