import type { Metadata } from "next";
import { Download } from "lucide-react";
import { Container } from "@/components/container";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Resume",
  description: "Downloadable PDF resume.",
};

export default function ResumePage() {
  return (
    <Container size="narrow">
      <Section
        eyebrow="Resume"
        title="Resume."
        action={
          <a
            href="/resume.pdf"
            download="HuynhThanhNam_Resume.pdf"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            <Download className="h-3.5 w-3.5" />
            Download PDF
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
          Can&apos;t view the PDF?{" "}
          <a
            href="/resume.pdf"
            className="underline decoration-border underline-offset-4 hover:decoration-foreground"
          >
            Open it directly
          </a>
          .
        </p>
      </Section>
    </Container>
  );
}
