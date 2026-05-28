import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built — case studies and code.",
};

export default function ProjectsPage() {
  return (
    <Container>
      <Section
        eyebrow="Projects"
        title="Things I've built."
      >
        <div className="border-b border-border">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>
    </Container>
  );
}
