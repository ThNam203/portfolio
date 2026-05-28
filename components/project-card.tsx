import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";

const cardCls =
  "group relative flex flex-col gap-4 border-t border-border py-8 transition-colors first:border-t-0 sm:flex-row sm:items-start sm:gap-10 sm:py-10";

export function ProjectCard({ project }: { project: Project }) {
  const body = <ProjectBody project={project} />;
  if (project.caseStudy) {
    return (
      <Link href={`/projects/${project.slug}`} className={cardCls}>
        {body}
      </Link>
    );
  }
  return <div className={cardCls}>{body}</div>;
}

function ProjectBody({ project }: { project: Project }) {
  return (
    <>
      <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground sm:w-32 sm:shrink-0 sm:pt-1">
        {project.period}
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-2xl tracking-tight text-balance sm:text-3xl">
            {project.name}
          </h3>
          {project.caseStudy && (
            <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
          )}
        </div>
        <p className="mt-2 text-pretty text-muted-foreground">
          {project.tagline}
        </p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 8).map((s) => (
            <li
              key={s}
              className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {s}
            </li>
          ))}
          {project.stack.length > 8 && (
            <li className="font-mono text-[11px] text-muted-foreground">
              +{project.stack.length - 8} more
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
