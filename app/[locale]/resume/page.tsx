import { notFound } from "next/navigation";
import { Download } from "lucide-react";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) return {};
  const dict = getDictionary(raw as Locale);
  return { title: dict.resume.eyebrow };
}

export default async function ResumePage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const dict = getDictionary(raw as Locale);

  return (
    <Container size="narrow">
      <Section
        eyebrow={dict.resume.eyebrow}
        title={dict.resume.title}
        action={
          <a
            href="/resume.pdf"
            download="HuynhThanhNam_Resume.pdf"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            <Download className="h-3.5 w-3.5" />
            {dict.resume.download}
          </a>
        }
      >
        <div className="overflow-hidden rounded-lg border border-border bg-foreground/[0.02]">
          <iframe
            src="/resume.pdf#view=FitH"
            title="Resume PDF"
            className="h-[1100px] w-full"
          />
        </div>
        <p className="mt-4 font-mono text-xs text-muted-foreground">
          {dict.resume.cantView}{" "}
          <a
            href="/resume.pdf"
            className="underline decoration-border underline-offset-4 hover:decoration-foreground"
          >
            {dict.resume.openDirect}
          </a>
          .
        </p>
      </Section>
    </Container>
  );
}
