import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, localeCookie } from "@/i18n/config";

/**
 * Indonesian lives at the unprefixed URLs and English under `/en`:
 * - `/id/...` redirects to `/...` so each page has one address;
 * - unprefixed paths are rewritten to the `[lang]` route as Indonesian,
 *   unless the visitor picked English with the switcher.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";

  if (first === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url);
  }

  if (hasLocale(first)) return NextResponse.next();

  const preferred = request.cookies.get(localeCookie)?.value;
  if (preferred && hasLocale(preferred) && preferred !== defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API routes, generated link-preview images (served at
  // /id/... and /en/... directly, so crawlers get no redirect) and any file with
  // an extension (icons, robots.txt, sitemap.xml).
  matcher: ["/((?!api|_next|.*opengraph-image|.*\\..*).*)"],
};
