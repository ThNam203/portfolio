import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowUpRight, Rss } from "lucide-react";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { fetchBlogPosts } from "@/lib/rss";
import { profile } from "@/content/profile";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Writing",
  description: `Posts from ${profile.socials.blog}.`,
};

export default function WritingPage() {
  return (
    <Container size="narrow">
      <Section
        eyebrow="Writing"
        title="From the blog."
        action={
          <Link
            href={profile.socials.blog}
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
          I write occasionally about systems, engineering practice, and
          whatever I&apos;m chewing on. Posts here are pulled live from{" "}
          <Link
            href={profile.socials.blog}
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
          >
            sen1or.blog
          </Link>
          .
        </p>
        <Suspense fallback={<PostsListSkeleton />}>
          <PostsList />
        </Suspense>
      </Section>
    </Container>
  );
}

async function PostsList() {
  const posts = await fetchBlogPosts(profile.socials.blogRss);

  if (posts.length === 0) {
    return (
      <div className="rounded-lg border border-border p-8 text-center">
        <p className="text-muted-foreground">
          Couldn&apos;t pull the feed right now.
        </p>
        <Link
          href={profile.socials.blog}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground hover:underline"
        >
          Visit sen1or.blog directly
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
