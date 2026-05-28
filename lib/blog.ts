import type { Locale } from "@/i18n/config";

export function blogUrl(locale: Locale): string {
  return `https://www.sen1or.blog/${locale}`;
}

export function blogRssUrl(locale: Locale): string {
  return `https://www.sen1or.blog/${locale}/rss.xml`;
}
