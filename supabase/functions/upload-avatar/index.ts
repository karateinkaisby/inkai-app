import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return new Response("Unauthorized", { status: 401, headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    {
      global: {
        headers: { Authorization: authHeader },
      },
    }
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return new Response("Invalid token", { status: 401, headers: corsHeaders });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file || !file.type.startsWith("image/")) {
    return new Response("Invalid file", { status: 400, headers: corsHeaders });
  }

  const ext = file.type.split("/")[1] ?? "jpg";
  const path = `${user.id}/avatar.${ext}`;
  const bytes = new Uint8Array(await file.arrayBuffer());

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(path, bytes, { upsert: true, contentType: file.type });

  if (uploadError) {
    return new Response(uploadError.message, { status: 500, headers: corsHeaders });
  }

  return new Response(
    JSON.stringify({
      path,
      publicUrl: `${Deno.env.get("SUPABASE_URL")}/storage/v1/object/public/avatars/${path}`,
    }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
});
