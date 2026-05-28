import Link from "next/link";
import { Container } from "@/components/container";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeHref } from "@/lib/utils";

export default function NotFound() {
  const dict = getDictionary(defaultLocale);
  return (
    <Container size="narrow">
      <div className="flex min-h-[60vh] flex-col items-start justify-center py-24">
        <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {dict.notFound.code}
        </div>
        <h1 className="mt-2 font-serif text-5xl tracking-tight">
          {dict.notFound.title}
        </h1>
        <p className="mt-3 max-w-md text-pretty text-muted-foreground">
          {dict.notFound.blurb}
        </p>
        <div className="mt-8 flex gap-3">
          <Link
            href={localeHref(defaultLocale)}
            className="rounded-full bg-foreground px-5 py-2.5 text-sm text-background"
          >
            {dict.notFound.home}
          </Link>
          <Link
            href={localeHref(defaultLocale, "projects")}
            className="rounded-full border border-border px-5 py-2.5 text-sm"
          >
            {dict.notFound.projects}
          </Link>
        </div>
      </div>
    </Container>
  );
}
