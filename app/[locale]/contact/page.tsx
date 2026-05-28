import { notFound } from "next/navigation";
import Link from "next/link";
import { Mail, Radio, Rss } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { ContactForm } from "@/components/contact-form";
import { profile } from "@/content/profile";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { blogUrl } from "@/lib/blog";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) return {};
  const dict = getDictionary(raw as Locale);
  return { title: dict.contact.eyebrow };
}

export default async function ContactPage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  const channels = [
    { label: "Email", value: profile.email, href: profile.socials.email, icon: Mail },
    { label: "GitHub", value: "@ThNam203", href: profile.socials.github, icon: GithubIcon },
    { label: "Blog", value: "sen1or.blog", href: blogUrl(locale), icon: Rss },
    { label: "Project", value: "letslive.work", href: profile.socials.livestream, icon: Radio },
  ];

  return (
    <Container size="narrow">
      <Section eyebrow={dict.contact.eyebrow} title={dict.contact.title}>
        <p className="max-w-xl text-pretty text-muted-foreground">
          {dict.contact.blurb}
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr,260px]">
          <ContactForm dict={dict.contact} />
          <aside className="space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {dict.contact.elsewhere}
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
