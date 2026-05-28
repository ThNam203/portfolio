import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Timeline } from "@/components/timeline";

export const metadata: Metadata = {
  title: "Experience",
  description: "Work history and roles.",
};

export default function ExperiencePage() {
  return (
    <Container size="narrow">
      <Section
        eyebrow="Experience"
        title="Where I've worked."
      >
        <Timeline />
      </Section>
    </Container>
  );
}
