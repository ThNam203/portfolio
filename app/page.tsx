import { Suspense } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { SkillsGrid } from "@/components/skills-grid";
import {
  GithubActivity,
  GithubActivitySkeleton,
} from "@/components/github-activity";
import { LatestPosts, LatestPostsSkeleton } from "@/components/latest-posts";
import { projects } from "@/content/projects";

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <Hero />
      <Stats />

      <Container>
        <Section
          eyebrow="Selected work"
          title="Projects worth talking about."
          action={
            <Link
              href="/projects"
              className="hidden font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground sm:inline-flex sm:items-center sm:gap-1"
            >
              All projects <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          }
        >
          <div className="border-b border-border">
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Section>

        <Section eyebrow="Toolbelt" title="Stack I reach for.">
          <SkillsGrid />
        </Section>

        <Section
          eyebrow="GitHub"
          title="Recent activity."
          action={
            <Link
              href="https://github.com/ThNam203"
              target="_blank"
              rel="noreferrer"
              className="hidden font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground sm:inline-flex sm:items-center sm:gap-1"
            >
              @ThNam203 <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          }
        >
          <Suspense fallback={<GithubActivitySkeleton />}>
            <GithubActivity />
          </Suspense>
        </Section>

        <Section
          eyebrow="Writing"
          title="From the blog."
          action={
            <Link
              href="/writing"
              className="hidden font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground sm:inline-flex sm:items-center sm:gap-1"
            >
              All posts <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          }
        >
          <Suspense fallback={<LatestPostsSkeleton />}>
            <LatestPosts />
          </Suspense>
        </Section>

        <Section eyebrow="Contact" title="Let's build something.">
          <div className="border-t border-border pt-8">
            <p className="max-w-xl text-pretty text-muted-foreground">
              Open to fullstack roles, freelance projects, and interesting
              technical conversations. Best way to reach me is email — I read
              everything.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm text-background transition-colors hover:bg-foreground/90"
              >
                Send a message
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-foreground transition-colors hover:bg-foreground/[0.04]"
              >
                View resume
              </Link>
            </div>
          </div>
        </Section>
      </Container>
    </>
  );
}
