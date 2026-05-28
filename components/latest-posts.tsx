import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { fetchBlogPosts } from "@/lib/rss";
import { blogUrl, blogRssUrl } from "@/lib/blog";
import { formatDate } from "@/lib/format";
import type { Locale } from "@/i18n/config";

export async function LatestPosts({
  limit = 3,
  locale,
  noPostsText = "No posts available right now. Visit",
}: {
  limit?: number;
  locale: Locale;
  noPostsText?: string;
}) {
  const posts = (await fetchBlogPosts(blogRssUrl(locale))).slice(0, limit);

  if (posts.length === 0) {
    return (
      <p className="font-mono text-xs text-muted-foreground">
        {noPostsText}{" "}
        <Link
          href={blogUrl(locale)}
          className="underline decoration-border underline-offset-4 hover:decoration-foreground"
        >
          sen1or.blog
        </Link>
        .
      </p>
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
            className="group flex items-center justify-between gap-6 py-5"
          >
            <div className="min-w-0 flex-1">
              <div className="truncate text-base text-foreground">{p.title}</div>
              {p.contentSnippet && (
                <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                  {p.contentSnippet}
                </p>
              )}
            </div>
            <div className="hidden font-mono text-xs text-muted-foreground sm:block">
              {formatDate(p.isoDate)}
            </div>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function LatestPostsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} className="h-16 animate-pulse" />
      ))}
    </ul>
  );
}
