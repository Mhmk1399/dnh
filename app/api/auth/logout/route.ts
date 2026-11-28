import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";
import { normalizeSiteLocale } from "@/lib/site-language";

export async function POST(request: Request) {
  await destroySession();
  if (request.headers.get("accept")?.includes("application/json")) {
    return new Response(null, { status: 204 });
  }
  const locale = normalizeSiteLocale(new URL(request.url).searchParams.get("locale") ?? undefined);
  return NextResponse.redirect(new URL(`/${locale}/login`, request.url), 303);
}
