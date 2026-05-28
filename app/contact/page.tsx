import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Radio, Rss } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { ContactForm } from "@/components/contact-form";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name}.`,
};

const channels = [
  { label: "Email", value: profile.email, href: profile.socials.email, icon: Mail },
  { label: "GitHub", value: "@ThNam203", href: profile.socials.github, icon: GithubIcon },
  { label: "Blog", value: "sen1or.blog", href: profile.socials.blog, icon: Rss },
  { label: "Project", value: "letslive.work", href: profile.socials.livestream, icon: Radio },
];

export default function ContactPage() {
  return (
    <Container size="narrow">
      <Section eyebrow="Contact" title="Get in touch.">
        <p className="max-w-xl text-pretty text-muted-foreground">
          Send a message and I&apos;ll reply within a couple of days. For
          quick stuff, email works best.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr,260px]">
          <ContactForm />
          <aside className="space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Elsewhere
            </h3>
            <ul className="divide-y divide-border border-y border-border">
              {channels.map((c) => (
                <li key={c.label}>
                  <Link
                    href={c.href}
                    target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noreferrer"
                    className="group flex items-center gap-3 py-3 text-sm"
                  >
                    <c.icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">
                        {c.label}
                      </div>
                      <div className="truncate text-foreground">{c.value}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>
    </Container>
  );
}
