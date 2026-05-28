import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isValidLocale, locales } from "./i18n/config";

const PUBLIC_FILE = /\.(.*)$/;

function pickLocale(req: NextRequest): string {
  const cookie = req.cookies.get("NEXT_LOCALE")?.value;
  if (cookie && isValidLocale(cookie)) return cookie;
  const accept = req.headers.get("accept-language") ?? "";
  const ranked = accept
    .split(",")
    .map((p) => p.trim().split(";")[0].toLowerCase())
    .filter(Boolean);
  for (const tag of ranked) {
    const base = tag.split("-")[0];
    if (isValidLocale(base)) return base;
  }
  return defaultLocale;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/sitemap") ||
    pathname.startsWith("/robots") ||
    pathname === "/favicon.ico" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }
  const first = pathname.split("/")[1];
  if (isValidLocale(first)) {
    const res = NextResponse.next();
    res.headers.set("x-locale", first);
    return res;
  }
  const locale = pickLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\.).*)"],
};

export const _locales = locales;
