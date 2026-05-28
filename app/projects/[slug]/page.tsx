import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "node:fs/promises";
import path from "node:path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
import { projects } from "@/content/projects";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return projects.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Params },
): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.tagline,
  };
}

async function loadCaseStudy(slug: string): Promise<string | null> {
  const file = path.join(
    process.cwd(),
    "content",
    "case-studies",
    `${slug}.mdx`,
  );
  try {
    return await fs.readFile(file, "utf8");
  } catch {
    return null;
  }
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug && p.caseStudy);
  if (!project) notFound();

  const source = await loadCaseStudy(slug);

  return (
    <Container size="narrow">
      <div className="py-12 sm:py-16">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All projects
        </Link>

        <header className="mt-10 border-b border-border pb-10">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {project.period} · {project.role}
          </div>
          <h1 className="mt-3 font-serif text-4xl tracking-tight text-balance sm:text-5xl">
            {project.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-pretty text-muted-foreground">
            {project.tagline}
          </p>
          {project.links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-mono text-xs text-foreground transition-colors hover:bg-foreground/[0.04]"
                >
                  {l.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          )}
        </header>

        <article className="prose-custom mt-10">
          {source ? (
            <MDXRemote source={source} />
          ) : (
            <p className="text-muted-foreground">{project.description}</p>
          )}
        </article>

        <section className="mt-14 border-t border-border pt-8">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Stack
          </h2>
          <ul className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <li
                key={s}
                className="rounded border border-border px-2 py-1 font-mono text-xs text-foreground"
              >
                {s}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 border-t border-border pt-8">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Highlights
          </h2>
          <ul className="space-y-2 text-pretty text-muted-foreground">
            {project.highlights.map((h, i) => (
              <li key={i} className="leading-relaxed">
                <span className="mr-2 select-none text-foreground/40">›</span>
                {h}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Container>
  );
}
