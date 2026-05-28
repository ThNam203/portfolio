import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { isValidLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { profile } from "@/content/profile";
import { siteUrl } from "@/lib/utils";

type Params = Promise<{ locale: string }>;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: { params: Params },
): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: {
      default: `${dict.meta.siteName} — ${profile.title}`,
      template: `%s — ${dict.meta.siteName}`,
    },
    description: profile.bio,
    keywords: [...dict.meta.keywords],
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        en: `${siteUrl}/en`,
        vi: `${siteUrl}/vi`,
      },
    },
    openGraph: {
      type: "website",
      locale,
      siteName: dict.meta.siteName,
      title: `${dict.meta.siteName} — ${profile.title}`,
      description: profile.bio,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  return (
    <>
      <Nav locale={locale as Locale} dict={dict.nav} />
      <main className="flex-1">{children}</main>
      <Footer dict={dict.footer} locale={locale as Locale} />
    </>
  );
}
