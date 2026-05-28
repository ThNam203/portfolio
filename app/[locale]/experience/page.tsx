import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Timeline } from "@/components/timeline";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedExperiences } from "@/content/i18n";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) return {};
  const dict = getDictionary(raw as Locale);
  return { title: dict.experience.eyebrow };
}

export default async function ExperiencePage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const items = localizedExperiences(locale);
  return (
    <Container size="narrow">
      <Section eyebrow={dict.experience.eyebrow} title={dict.experience.title}>
        <Timeline items={items} />
      </Section>
    </Container>
  );
}
