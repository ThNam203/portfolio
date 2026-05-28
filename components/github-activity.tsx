import Link from "next/link";
import { Star, GitFork, ArrowUpRight } from "lucide-react";
import { fetchUserRepos, langColor } from "@/lib/github";
import { formatRelative } from "@/lib/format";

export async function GithubActivity({ limit = 6 }: { limit?: number }) {
  const repos = await fetchUserRepos();
  const top = repos.slice(0, limit);

  if (top.length === 0) {
    return (
      <p className="font-mono text-xs text-muted-foreground">
        GitHub data unavailable right now.
      </p>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {top.map((r) => (
        <Link
          key={r.fullName}
          href={r.url}
          target="_blank"
          rel="noreferrer"
          className="group flex flex-col gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-foreground/[0.025]"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="font-mono text-sm text-foreground">{r.name}</div>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
          </div>
          {r.description && (
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {r.description}
            </p>
          )}
          <div className="mt-auto flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
            {r.language && (
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: langColor(r.language) }}
                />
                {r.language}
              </span>
            )}
            {r.stars > 0 && (
              <span className="inline-flex items-center gap-1">
                <Star className="h-3 w-3" />
                {r.stars}
              </span>
            )}
            {r.forks > 0 && (
              <span className="inline-flex items-center gap-1">
                <GitFork className="h-3 w-3" />
                {r.forks}
              </span>
            )}
            <span className="ml-auto">{formatRelative(r.pushedAt)}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function GithubActivitySkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-32 animate-pulse rounded-lg border border-border bg-foreground/[0.025]"
        />
      ))}
    </div>
  );
}
