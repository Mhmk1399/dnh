import { NextResponse, type NextRequest } from "next/server";

import {
  getLocaleFromPathname,
  getLocalizedSiteHref,
  isSharedSitePath,
  stripLocalePrefix,
} from "@/lib/site-language";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const locale = getLocaleFromPathname(pathname);
  const path = stripLocalePrefix(pathname);

  if (locale && isSharedSitePath(path)) {
    const target = request.nextUrl.clone();
    target.pathname = path;
    return NextResponse.redirect(target, 308);
  }

  if (!locale && !isSharedSitePath(pathname) && !/^\/[a-z]{2}(?:\/|$)/i.test(pathname)) {
    const target = request.nextUrl.clone();
    target.pathname = getLocalizedSiteHref(pathname, "fa");
    return NextResponse.redirect(target, 308);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-dnh-pathname", pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api(?:/|$)|_next(?:/|$)|assets(?:/|$)|icons(?:/|$)|favicon.ico|sw.js|manifest.webmanifest|sitemap.xml|robots.txt).*)"],
};
