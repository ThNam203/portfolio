import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
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
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  localizedProfile,
  localizedProjects,
  localizedSkills,
} from "@/content/i18n";
import { localeHref } from "@/lib/utils";

type Params = Promise<{ locale: string }>;

export default async function Home({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const prof = localizedProfile(locale);
  const projects = localizedProjects(locale);
  const skills = localizedSkills(locale);
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <Hero
        locale={locale}
        name={prof.name}
        title={prof.title}
        bio={prof.bio}
        location={prof.location}
        dict={dict.hero}
      />
      <Stats items={prof.stats} />

      <Container>
        <Section
          eyebrow={dict.home.selectedWork}
          title={dict.home.projectsTitle}
          action={
            <Link
              href={localeHref(locale, "projects")}
              className="hidden font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground sm:inline-flex sm:items-center sm:gap-1"
            >
              {dict.home.allProjects} <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          }
        >
          <div className="border-b border-border">
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={p} locale={locale} />
            ))}
          </div>
        </Section>

        <Section eyebrow={dict.home.toolbelt} title={dict.home.stackTitle}>
          <SkillsGrid groups={skills} />
        </Section>

        <Section
          eyebrow={dict.home.githubEyebrow}
          title={dict.home.githubTitle}
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
            <GithubActivity unavailableText={dict.common.ghUnavailable} />
          </Suspense>
        </Section>

        <Section
          eyebrow={dict.home.writingEyebrow}
          title={dict.home.writingTitle}
          action={
            <Link
              href={localeHref(locale, "writing")}
              className="hidden font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground sm:inline-flex sm:items-center sm:gap-1"
            >
              {dict.home.allPosts} <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          }
        >
          <Suspense fallback={<LatestPostsSkeleton />}>
            <LatestPosts locale={locale} noPostsText={dict.common.noPosts} />
          </Suspense>
        </Section>

        <Section
          eyebrow={dict.home.contactEyebrow}
          title={dict.home.contactTitle}
        >
          <div className="border-t border-border pt-8">
            <p className="max-w-xl text-pretty text-muted-foreground">
              {dict.home.contactBlurb}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={localeHref(locale, "contact")}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm text-background transition-colors hover:bg-foreground/90"
              >
                {dict.home.sendMessage}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href={localeHref(locale, "resume")}
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-foreground transition-colors hover:bg-foreground/[0.04]"
              >
                {dict.home.viewResume}
              </Link>
            </div>
          </div>
        </Section>
      </Container>
    </>
  );
}
