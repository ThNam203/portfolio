import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Rss } from "lucide-react";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { fetchBlogPosts } from "@/lib/rss";
import { blogRssUrl, blogUrl } from "@/lib/blog";
import { formatDate } from "@/lib/format";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) return {};
  const dict = getDictionary(raw as Locale);
  return { title: dict.writing.eyebrow };
}

export default async function WritingPage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <Container size="narrow">
      <Section
        eyebrow={dict.writing.eyebrow}
        title={dict.writing.title}
        action={
          <Link
            href={blogUrl(locale)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            <Rss className="h-3.5 w-3.5" />
            sen1or.blog
          </Link>
        }
      >
        <p className="mb-8 max-w-2xl text-pretty text-muted-foreground">
          {dict.writing.blurb}{" "}
          <Link
            href={blogUrl(locale)}
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
          >
            sen1or.blog
          </Link>
          .
        </p>
        <Suspense fallback={<PostsListSkeleton />}>
          <PostsList locale={locale} dict={dict.writing} />
        </Suspense>
      </Section>
    </Container>
  );
}

async function PostsList({
  locale,
  dict,
}: {
  locale: Locale;
  dict: { feedDown: string; visitDirect: string };
}) {
  const posts = await fetchBlogPosts(blogRssUrl(locale));

  if (posts.length === 0) {
    return (
      <div className="rounded-lg border border-border p-8 text-center">
        <p className="text-muted-foreground">{dict.feedDown}</p>
        <Link
          href={blogUrl(locale)}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground hover:underline"
        >
          {dict.visitDirect}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-border border-y border-border">
      {posts.map((p) => (
        <li key={p.link}>
          <Link
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="group flex items-start justify-between gap-6 py-6"
          >
            <div className="min-w-0 flex-1">
              <div className="text-lg text-foreground">{p.title}</div>
              {p.contentSnippet && (
                <p className="mt-2 line-clamp-2 text-pretty text-muted-foreground">
                  {p.contentSnippet}
                </p>
              )}
              {p.categories && p.categories.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {p.categories.slice(0, 4).map((c) => (
                    <li
                      key={c}
                      className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="hidden shrink-0 text-right sm:block">
              <div className="font-mono text-xs text-muted-foreground">
                {formatDate(p.isoDate)}
              </div>
              <ArrowUpRight className="mt-2 inline h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function PostsListSkeleton() {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i} className="h-24 animate-pulse" />
      ))}
    </ul>
  );
}
