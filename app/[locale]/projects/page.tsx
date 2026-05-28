import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedProjects } from "@/content/i18n";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) return {};
  const dict = getDictionary(raw as Locale);
  return { title: dict.projects.eyebrow };
}

export default async function ProjectsPage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const projects = localizedProjects(locale);
  return (
    <Container>
      <Section eyebrow={dict.projects.eyebrow} title={dict.projects.title}>
        <div className="border-b border-border">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} locale={locale} />
          ))}
        </div>
      </Section>
    </Container>
  );
}
